import React      from "react"
import ReactDOM   from "react-dom"
import Header     from "../templates/header.jsx"
import MainPage   from "../templates/main_page.jsx"
import BoardPage  from "../templates/board_page.jsx" 
import NotFound   from "../templates/not_found.jsx"

class View {
  get container () { return this._container }
  get header    () { return this._header    }
  get preloader () { return this._preloader }

  constructor() {
    for (let name of ["container", "header", "preloader"]) {
      this[`_${name}`] = document.getElementById(name)
    }
  }

  showPreloader() {
    setTimeout(() => { this.preloader.className = "fadein shown" }, 600)
  }

  hidePreloader() {
    this.updateHeader()
    this.preloader.className     = ""
    this.preloader.style.display = "none"
    this.container.style.display = "block"
    this.container.className = "fadein"
  }

  highlightPost(shortHash, fallbackURL) {
    if (!!!shortHash) {
      return
    }
    let post = Threads.entMap[shortHash]
    if (!!post) {
      post.highlight()
    } else {
      if (fallbackURL) {
        window.top.location.href = fallbackURL  
      }
    }
  }

  renderHeader(siteInfo) {
    this.rHeader = ReactDOM.render(<Header siteInfo={Nullchan.siteInfo} board={ {} } hidden={true} />, this.header)
  }

  updateHeader() {
    if (Nullchan.currentPage == "main") {
      this.header.className = "hidden"
    } else {
      this.header.className = ""
    }

    if (!!Nullchan.currentBoard && !!this.rHeader) {
      this.rHeader.setState({board: Nullchan.currentBoard, hidden: false})
    }
  }

  renderMainPage() {
    Threads.updateLastPost().then(() => {
      this.rMainPage = ReactDOM.render(
        <MainPage 
          boards={Boards.list} 
          siteInfo={Nullchan.siteInfo}
          lastPostTime={Threads.lastPostTime}
          totalPosts={Threads.totalPosts}
        />, this.container
      )

      this.hidePreloader()
    })
  }

  renderBoard(page = 1, threadHash = null) {
    let promise
    if (threadHash == null) {
      promise = Threads.loadAll()
    } else {
      promise = Threads.loadSingle(threadHash)
    }

    Threads.loadNumbers().then(() => {
      promise.then((threads) => {
        this.rBoardPage = ReactDOM.render(
          <BoardPage formShown={false} threads={threads} currentPage={page} />, this.container
        )
        this.hidePreloader()
        if (Nullchan.currentPage == "list") {
          SeenCount.setLocalCounter(Nullchan.currentBoard.key)  
        }

        let hl = window.location.search.match(/hl-(\w+)/)
        if (!!hl) {
          this.highlightPost(hl[1])
        }
      })
    })
  }

  renderNotFound () {
    ReactDOM.render(<NotFound/>, this.container)
    this.hidePreloader()
  }

  updateSiteInfo (newInfo) {
    if (!!this.rHeader) {
      this.rHeader.setState({siteInfo: newInfo})
    }

    if (!!this.rMainPage) {
      Threads.updateLastPost().then(() => { 
        this.rMainPage.setState({
          lastPostTime: Threads.lastPostTime,
          siteInfo:     newInfo,
        }) 
      })
    }

    if (!!this.rAuthForm) {
      this.rAuthForm.setState({userName: Nullchan.shortUserName()})
    }
  }
}
window.View = new View()
