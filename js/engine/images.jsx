class Images {
  static process(formData) {
    return new Promise((resolve, reject) => {
      if (!!!formData.file) {
        delete formData.file
        return resolve(formData)
      }

      if (["image/jpeg", "image/png", "image/jpg"].indexOf(formData.file.type) == -1) {
        reject("Only JPEG and PNG files are supported at the moment.")
        return
      }

      let image  = document.createElement("img")
      let reader = new FileReader()

      reader.onload = (event) => { image.src = event.target.result }
      image.onload  = () => {
        let canvas    = document.createElement("canvas")
        let ctx       = canvas.getContext("2d")
        canvas.width  = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        let imageFull = canvas.toDataURL(formData.file.type, 1).split(',')[1]
        let maxWidth  = 200
        let maxHeight = 200
        let width     = image.width
        let height    = image.height

        formData.attachment             = formData.file.name.trim()
        formData.attachment_size        = formData.file.size
        formData.attachment_full_height = height
        formData.attachment_full_width  = width

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
    
        formData.attachment_thumb_height = height
        formData.attachment_thumb_width  = width

        ctx = canvas.getContext("2d")
        ctx.drawImage(image, 0, 0, width, height)

        let imageThumb  = canvas.toDataURL("image/jpeg", 1).split(',')[1]
        let hash        = md5(imageFull)

        if (formData.attachment == "") {
          formData.attachment = `${hash}.jpg`
        }

        Files.uploadFile(imageFull, `${hash}.jpg`, false).then((fullPath) => {
          Files.uploadFile(imageThumb, `${hash}-thumb.jpg`, false).then((thumbPath) => {
            formData.attachment_thumb_path = thumbPath
            formData.attachment_full_path = fullPath
            delete formData.file
            resolve(formData)
          })
        })
      }
      reader.readAsDataURL(formData.file)
    })
  }
}