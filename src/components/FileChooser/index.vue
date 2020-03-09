<template>
  <div class="file-selector">
    <input
      ref="file-input"
      class="file-input"
      type="file"
      multiple="multiple"
      @change="onInputChange"
    />
    <div class="drop-section" @drop="onDrop" @dragover="onDragover" @dragleave="onDragLeave">
      <div class="no-drag" v-show="!isDropOver">
        <img
          style="width: 204px; height: 52px;"
          alt
          draggable="false"
          src="https://github.githubassets.com/images/files-lg.svg"
        />
        <h2 class="chooser-text">拖拽文件至此上传到服务器</h2>或
        <a class="chooser-btn" href="#" @click="onBtnClick">点击上传</a>
      </div>
      <div class="drag-over" v-show="isDropOver">
        <img
          style="width: 204px; height: 52px;"
          alt
          draggable="false"
          src="https://github.githubassets.com/images/files-lg.svg"
        />
        <h2 class="chooser-text">松开鼠标上传到服务器</h2>
        <div class="placeholder"></div>
      </div>
    </div>
    <div class="file-list">
      <el-row class="file-item" v-for="item in showedFileList" :key="item.name">
        <el-col class="file-name" :span="14">
          <div class="grid-content bg-purple">
            <i class="el-icon-picture-outline" v-if="item.isPicture"></i>
            <i class="el-icon-video-camera" v-if="!item.isPicture"></i>
            {{ item.name }}
          </div>
        </el-col>
        <el-col class="progress" :span="8">
          <div class="grid-content bg-purple">
            <el-progress :percentage="item.progress" :stroke-width="13" v-if="item.progress != 100"></el-progress>
            <el-progress
              :percentage="100"
              status="success"
              :stroke-width="13"
              v-if="item.progress === 100"
            ></el-progress>
          </div>
        </el-col>
        <el-col class="opt" :span="2">
          <el-button icon="el-icon-close" circle size="mini" @click="onFileDeleteClicked(item.name)"></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Util from "@/util";

export default {
  data() {
    return {
      fileList: [],
      showedFileList: [],
      isDropOver: false
    };
  },
  methods: {
    onDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      this.isDropOver = false;
      var files = [];
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        files.push(e.dataTransfer.files[i]);
      }
      files = this.addFiles(files);
      this.$emit("onFileSelected", files);
    },
    onDragLeave(e) {
      e.stopPropagation();
      e.preventDefault();
      this.isDropOver = false;
    },
    onDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      this.isDropOver = true;
      e.dataTransfer.dropEffect = "copy";
    },
    onBtnClick() {
      this.$refs["file-input"].click();
    },
    onInputChange(e) {
      var files = [];
      for (var i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
      }
      files = this.addFiles(files);
      this.$emit("onFileSelected", files);
    },
    addFiles(files) {
      if (this.fileList.length + files.length > 3) {
        this.showMessage("达到上传文件数量限制，最多 3 个", "warning");
        return []
      }
      var beforeLength = files.length;
      files = files.filter(function(file) {
        return Util.getFileType(file) != "unknown";
      });
      if (files.length != beforeLength) {
        this.showMessage("存在不支持的文件类型，已忽略", "warning");
      }
      beforeLength = files.length;
      var that = this;
      files = files.filter(function(file) {
        for (var i = 0; i < that.fileList.length; i++) {
          if (that.fileList[i].name === file.name) {
            return false;
          }
        }
        return true;
      });
      if (files.length != beforeLength) {
        this.showMessage("存在相同的文件，已忽略", "warning");
      }
      for (var i = 0; i < files.length; i++) {
        this.fileList.push(files[i]);
        var showedFile = {}
        showedFile.name = files[i].name
        showedFile.progress = 100
        if (i === 0) {
          showedFile.progress = 51
        }
        showedFile.isPicture = Util.getFileType(files[i]) === 'picture'
        this.showedFileList.push(showedFile)
      }
      return files;
    },
    showMessage(message, type) {
      this.$message({
        message,
        type
      });
    },
    progressFormat(p) {
      return p === 100 ? '上传成功' : `${p}%`
    },
    onFileDeleteClicked(name) {
      var file = {}
      for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].name === name) {
          file = this.fileList[i]
          this.fileList.splice(i, 1)
          break
        }
      }
      for (var i = 0; i < this.showedFileList.length; i++) {
        if (this.showedFileList[i].name === name) {
          this.showedFileList.splice(i, 1)
          break
        }
      }
      this.$emit("onFileDeleted", file)
    }
  }
};
</script>

<style scoped>
.file-selector {
  background-color: #fafafa;
  border-left: 2px solid #bbb;
  border-top: 2px solid #bbb;
  border-right: 2px solid #bbb;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.file-input {
  display: none;
  z-index: -9999;
}
.drop-section {
  line-height: 1.4;
  text-align: center;
  padding: 10px 10px;
  font-size: 20px;
}
.chooser-btn {
  color: #0366d6;
  text-decoration: none;
  font-size: 20px;
}
.chooser-text {
  font-weight: 600;
  color: #666;
  font-size: 24px;
  z-index: -9998;
}
.no-drag {
  padding-top: 100px;
  padding-bottom: 80px;
}
.drag-over {
  padding-top: 100px;
  padding-bottom: 80px;
  border: 5px dashed #cccccc;
  border-radius: 5px;
}
.placeholder {
  height: 0.9em;
}
.file-list {
  border-left: 2px solid #bbb;
  border-bottom: 2px solid #bbb;
  border-right: 2px solid #bbb;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: #fafafa;
  padding: 0;
  text-align: center;
}
.file-item {
  border-top: 2px solid #ddd;
}
.file-name {
  padding: 10px 8px;
  text-align: left;
  font-size: 22px;
}
.progress {
  padding: 14px 0px;
  text-align: left;
}
.opt {
  padding: 8px 8px; 
  text-align: right;
  font-size: 22px
}
i {
  margin-right: 5px;
}
</style>