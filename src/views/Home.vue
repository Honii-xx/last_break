<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row>
        <file-chooser @onFileSelected="onFileSelected" @onFileDeleted="onFileDeleted"></file-chooser>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileChooser from '@/components/FileChooser'
import Util from '@/util'

export default {
  name: "Home",
  components: { FileChooser },
  data() {
    return {
    }
  },
  methods: {
    onFileSelected(files) {
      console.log(files)
    },
    onFileDeleted(file) {
      console.log(file)
    }
  }
};
</script>

<style scoped>
</style>
