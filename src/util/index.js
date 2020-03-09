module.exports.getFileType = function(file) {
  var pictureTypes = ['.jpg', '.jpeg', '.png', '.bmp', '.gif']
  var videoTypes = ['.mp4']
  var dotIndex = file.name.lastIndexOf('.')
  if (dotIndex < 0) {
    return 'unknown'
  }
  var suffix = file.name.substr(dotIndex).toLowerCase()
  if (pictureTypes.indexOf(suffix) >= 0) {
    return 'picture'
  }
  if (videoTypes.indexOf(suffix) >= 0) {
    return 'video'
  }
  return 'unknown'
}