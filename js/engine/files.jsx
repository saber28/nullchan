require("../libs/md5.js")

class Files {
  constructor () {
    this.optionalOK = false
  }

  path (fileName) {
    return `data/users/${Nullchan.siteInfo.auth_address}/${fileName}`
  }

  checkIfOptionalOK () {
    return new Promise((resolve) => {
      if (this.optionalOK == true) {
        resolve()
        return
      }
      let options = { inner_path: this.path("content.json"), required: false }
      Nullchan.cmd("fileGet", options, (contentJson) => {
        if (!!!contentJson) {
          this.publishBasicContentJson().then((contentJson) => {
            this.setOptional(contentJson).then(() => { resolve() })
          })
        } else {
          let data = JSON.parse(contentJson)
          if (data.optional == ".*\\.(png|jpg|gif)") {
            this.setOptional(contentJson).then(() => { resolve() })
          } else {
            this.optionalOK = true
            resolve()
          }
        }
      })
    })
  }

  publishBasicContentJson () {
    return new Promise((resolve) => {
      let path = this.path("test.txt")
      Nullchan.cmd("fileWrite", [path, btoa("fuck this")], (write) => {
        Nullchan.cmd("siteSign", { inner_path: path }, (basicResponse) => {
          Nullchan.cmd("fileGet", this.path("content.json"), (contentJson) => {
            resolve(contentJson)
          })
        })
      })
    })
  }

  setOptional (strJson) {
    return new Promise((resolve) => {
      let path = this.path("content.json")
      let data = JSON.parse(strJson)
      data.optional = ".*\\.(png|jpg|gif)"
      let json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))

      Nullchan.cmd("fileWrite", [path, btoa(json_raw)], (write) => {
        if (write != "ok") {
          alert(JSON.stringify(write))
          alert("Sorry, still testing this one")
        }
        Nullchan.cmd("siteSign", { inner_path: path }, (signResponse) => {
          this.optionalOK = true
          resolve()
        })
      })
    })
  }

  uploadFile (rawBase64, fileName, publish) {
    return new Promise((resolve, reject) => {
      this.checkIfOptionalOK().then(() => {
        let path = this.path(fileName)
        Nullchan.cmd("fileWrite", [path, rawBase64], (write) => {
          if (write == "ok") {
            if (publish == false) {
              resolve(path)
            } else {
              Nullchan.cmd("sitePublish", { "inner_path": path }, (publish) => {
                if (publish == "ok") {
                  resolve(path)
                } else {
                  reject(publish)
                }
              })
            }
          } else {
            reject(write)
          }
        })
      })
    })
  }

  uploadPost (formData) {
    return new Promise((resolve, reject) => {
      Nullchan.cmd("fileGet", { inner_path: this.path("data.json"), required: false }, (data) => {
        if (!!data) {
          try {
            data = JSON.parse(data)
          } catch(err) {
            data = { message: [] }
          }
        } else {
          data = { message: [] }
        }

        formData.hashsum = md5(JSON.stringify(formData))
        formData.board = Nullchan.currentBoard.key
        data.message.push(formData)
        let json = unescape(encodeURIComponent(JSON.stringify(data, undefined, '  ')))

        this.uploadFile(btoa(json), "data.json", true).then(() => {
          resolve(formData)
        }).catch((err) => { reject(err) })
      })
    })
  }
}
window.Files = new Files()
