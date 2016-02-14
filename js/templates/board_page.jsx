class BoardPage extends React.Component {
  constructor (props) {
    super(props)
    this.threadMap = {}
    this.state = props
  }

  render () {
    var content = ""
    var buttonText = "create new thread"
    if (Nullchan.currentPage == "thread") { 
      buttonText = "reply to this thread"
    }

    if (!!!this.props.threads) {
      content = <div id="empty-board">
        It looks like this board is empty. <br/> Why don't you post something?
      </div>
    } else {

      content = this.props.threads.map((thread) => {
        return <Thread 
          ref={(t) => this.threadMap[thread[0].hashsum] = t}
          key={thread[0].hashsum}
          posts={thread} 
          full={Nullchan.currentPage == "thread"}
        />
      })
    }

    return (
      <div id="board-page">
        <FormButton text={buttonText} hidden={this.state.formShown} />
        <Form hidden={!this.state.formShown} ref={(f) => this.rForm = f} />
        <hr />
        {content}
      </div>
    )
  }
}