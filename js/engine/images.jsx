class Images {
  static process (formData) {
    return new Promise((resolve) => {
      if (!!!formData.file) {
        delete formData.file
        return resolve(formData)
      }

      var image  = document.createElement("img")
      var reader = new FileReader()

      reader.onload = (event) => { image.src = event.target.result }
      image.onload  = () => {
        var canvas    = document.createElement("canvas")
        var ctx       = canvas.getContext("2d")
        canvas.width  = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        var imageFull = canvas.toDataURL("image/jpeg", 1).split(',')[1]
        var maxWidth  = 200
        var maxHeight = 200
        var width     = image.width
        var height    = image.height

        if (width > height) {
          if (width > maxWidth) {
            height *= (maxWidth / width)
            width   = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= (maxHeight/ height)
            height = maxHeight
          }
        }

        canvas.width  = width
        canvas.height = height
        ctx = canvas.getContext("2d")
        ctx.drawImage(image, 0, 0, width, height)

        var imageThumb  = canvas.toDataURL("image/jpeg", 1).split(',')[1]
        var hash        = md5(imageFull)

        Files.uploadFile(imageFull, `${hash}.jpg`, false).then((fullPath) => {
          Files.uploadFile(imageThumb, `${hash}-thumb.jpg`, false).then((thumbPath) => {
            formData.file_thumb = thumbPath
            formData.file_full  = fullPath
            delete formData.file
            resolve(formData)
          })
        })
      }
      reader.readAsDataURL(formData.file)
    })
  }
}