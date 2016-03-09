import React      from "react"
import PageBox    from "./page_box.jsx"
import Thread     from "./thread.jsx"
import Form       from "./form.jsx"
import FormButton from "./form_button.jsx"

export default class BoardPage extends React.Component {
  constructor(props) {
    super(props)
    this.threadMap = {}
    this.state = props
  }

  paginate(data, options) {
    console.log(`Incoming current page: ${options.page}`)

    data = data || [];

    // adapt to zero indexed logic
    let page = options.page - 1 || 0
    let perPage = options.perPage
    let amountOfPages = Math.ceil(data.length / perPage)
    let startPage = page < amountOfPages? page : 0
    let finalPage = startPage

    if (!(options.page == 1 || options.page == 0)) {
      finalPage += 1
    }

    return {
      totalPages:   amountOfPages,
      data:         data.slice(startPage * perPage, startPage * perPage + perPage),
      currentPage:  finalPage
    }
  }

  render() {
    let content = ""
    let parent = null 
    let buttonText = "create new thread"
    let threads
    let pageBox

    if (Nullchan.currentPage == "thread") { 
      buttonText = "reply to this thread"
      parent = this.props.threads[0][0].hashsum
    }

    if (!!!this.props.threads) {
      content = <div id="empty-board">
        It looks like this board is empty. <br/> Why don't you post something?
      </div>
    } else {
      threads = this.paginate(this.props.threads, { 
        page:     this.props.currentPage, 
        perPage:  Nullchan.engineSettings.threadsPerPage
      })
      content = threads.data.map((thread) => {
        return <Thread 
          ref={(t) => this.threadMap[thread[0].hashsum] = t}
          key={thread[0].hashsum}
          posts={thread} 
          full={Nullchan.currentPage == "thread"}
        />
      })
      if (Nullchan.currentPage != "thread") {
        pageBox = <PageBox currentPage={threads.currentPage} totalPages={threads.totalPages} />
      }
    }

    return (
      <div id="board-page">
        <FormButton text={buttonText} hidden={this.state.formShown} />
        <Form hidden={!this.state.formShown} ref={(f) => this.rForm = f} parent={parent} />
        <hr />

        {pageBox}
        {content}
        {pageBox}
      </div>
    )
  }
}