class Nullchan extends ZeroFrame {
  get currentPath ()     { return this._currentPath   }
  get currentPage ()     { return this._currentPage   }
  get currentBoard()     { return this._currentBoard  }
  get siteInfo    ()     { return this._siteInfo      }
  set currentPage (page) { this._currentPage = page   }
  set siteInfo    (info) { this._siteInfo = info      }
  set currentBoard(board){ this._currentBoard = board }
  
  init () {
    this.grepPath()
    this.siteInfoUpdatedAt = 0
    this.currentPage = null
    View.showPreloader()
  }

  reloadSiteInfo () {
    setTimeout(this.reloadSiteInfo.bind(this), 15000)
    if ((Helpers.unixTimestamp("now") - this.siteInfoUpdatedAt) < 30) {
      return
    }
    this.cmd("siteInfo", {}, (newInfo) => { this.updateSiteInfo(newInfo) })
  }

  onOpenWebsocket () {
    this.cmd("siteInfo", {}, (newInfo) => {
      this.updateSiteInfo(newInfo)
      if (this.currentPage == null) {
        View.renderHeader()
        this.determineRoute()
      }
      this.reloadSiteInfo()
    })
  }

  onRequest (cmd, message) {
    if (cmd == "setSiteInfo") {
      this.updateSiteInfo(message)
    }
  }

  updateSiteInfo (newInfo) {
    this.siteInfo = newInfo.params || newInfo
    this.siteInfoUpdatedAt = Helpers.unixTimestamp("now")
    View.updateSiteInfo(this.siteInfo)
  }

  determineRoute () {
    Boards.reload().then(() => {
      if (this.currentPath.length == 0) {
        this.currentPage = "main"
        View.renderMainPage()
      } else {
        let board = Boards.getByKey(this.currentPath[0])
        if (board != null) {
          this.currentBoard = board
          if (this.currentPath.length == 1) {
            this.currentPage = "list"
            View.renderBoard()
          }
        }
      }
      View.updateHeader()
      if (!!!this.currentPage) {
        View.renderNotFound()
      }
    })
  }

  shortUserName (name = null) {
    if (!name) {
      name = this.siteInfo.cert_user_id
    }
    if (name == "sthetz@zeroid.bit") {
      return "[dev] sthetz"
    }
    if (!name) {
      return name
    }
    return name.split("@")[0]
  }

  grepPath () {
    var result = []
    for (let part of window.location.search.substring(1).split("/")) {
      if (part.includes("wrapper_nonce")) {
        part = part.split("wrapper_nonce")[0]
      }
      part = part.trim()
      if (part[part.length-1] == "&") {
        part = part.substring(0, part.length-1)
      }
      if (part == "" || part == "&") {
        continue
      }
      result.push(part)
    }
    this._currentPath = result
  }
}

window.Nullchan = new Nullchan()
