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

  constructor () {
    for (let name of ["container", "header", "preloader"]) {
      this[`_${name}`] = document.getElementById(name)
    }
  }

  showPreloader () {
    this.preloader.className     = ""
    this.container.style.display = "none"
    setTimeout(() => { this.preloader.className = "shown" }, 600)
  }

  hidePreloader () {
    this.preloader.className     = ""
    this.preloader.style.display = "none"
    this.container.style.display = "block"
    this.container.className     = "fadein"
    setTimeout(() => { this.container.className = "" }, 1000)
  }

  renderHeader (siteInfo) {
    this.rHeader = ReactDOM.render(<Header siteInfo={Nullchan.siteInfo} board={ {} }/>, this.header)
  }

  updateHeader () {
    if (Nullchan.currentPage != "main") {
      this.header.className = "with-border"
    } else {
      this.header.className = ""
    }

    if (!!Nullchan.currentBoard && !!this.rHeader) {
      this.rHeader.setState({board: Nullchan.currentBoard})
    }
  }

  renderMainPage () {
    Threads.updateLastPost().then(() => {
      this.rMainPage = ReactDOM.render(
        <MainPage 
          boards={Boards.list} 
          siteInfo={Nullchan.siteInfo}
          lastPostTime={Threads.lastPostTime}
        />, this.container
      )

      this.hidePreloader()
    })
  }

  renderBoard (threadHash = null) {
    let promise
    if (threadHash == null) {
      promise = Threads.loadAll()
    } else {
      promise = Threads.loadSingle(threadHash)
    }

    promise.then((threads) => {
      this.rBoardPage = ReactDOM.render(
        <BoardPage formShown={false} threads={threads} />, this.container
      )
      this.hidePreloader()
      if (Nullchan.currentPage == "list") {
        SeenCount.setLocalCounter(Nullchan.currentBoard.key)  
      }
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
