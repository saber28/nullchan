class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  shortHashsum() {
    return this.state.data.hashsum.substring(22, 32)
  }

  userName() {
    return Nullchan.shortUserName(this.state.data.cert_user_id)
  }

  formattedTime() {
    return Helpers.timeSince(this.state.data.created_at)
  }

  renderMarkup() {
    return { __html: Markup.render(this.state.data.body) }
  }

  bodyClick(event) {
    if (event.target.className == "reflink") {
      var hash = event.target.innerHTML.substring(8)
      var post = Threads.shortMap[hash]

      if (!!post) {
        var node = document.getElementById(`post-${post.hashsum}`)
        if (!!node) {
          event.preventDefault()  
          node.scrollIntoView()
        }
      }
    }
  }

  callForm() {
    if (View.formBlurred) {
      return
    }

    if (!!View.postWithReplyForm) {
      View.postWithReplyForm.setState({showForm: false})
    }
    View.postWithReplyForm = this
    this.setState({showForm: true}, () => { 
      View.rReplyForm.called(`>>${this.shortHashsum()}\n`)
    })    
  }

  render() {
    var klass   = "post"
    var button  = ""
    var picture = ""
    var form    = ""

    var userNameClass = ""
    var infoClassName = "info"

    if (!!this.state.data.parent) {
      klass += " reply"
    } else {
      klass += " opening"
      if (Nullchan.currentPage == "list") {
        button = <a target="_parent" className="thread-link" 
          href={Helpers.fixLink(`?/${this.state.data.board}/thread/${this.state.data.hashsum}`)}>
            [&nbsp;<span className="highlighted">open thread</span>&nbsp;]
        </a>
      }
    }

    if (!!this.state.data.attachment) {
      infoClassName += " with-file"
      picture = <Attachment data={this.state.data} />
    } else if (!!this.state.data.file_thumb) {
      picture = <AttachmentOld urlFull={this.state.data.file_full} urlThumb={this.state.data.file_thumb} />
    }

    if (this.state.showForm == true) {
      form = <Form hidden={false} ref={(f) => View.rReplyForm = f} 
        isReply={true} parent={this.state.data.parent || this.state.data.hashsum} />
    }

    if (this.state.data.anonymous) {
      userNameClass = "anonymous"
    }

    return(
      <div className="post-wrapper">
        <div className={klass}
          data-hashsum={this.state.data.hashsum} id={`post-${this.state.data.hashsum}`}>
          <div className={infoClassName}>
            <div className="time-and-id">
              <strong className={userNameClass}>
                {!!this.state.data.anonymous ? "Anonymous" : `${this.userName()}`}
              </strong>
              &nbsp;wrote&nbsp;
              {this.formattedTime()},
              &nbsp;
              <em className="post-id" onClick={this.callForm.bind(this)}>#{this.shortHashsum()}</em>
            </div>
            {button}
          </div>
          {picture}
          <blockquote className="text" onClick={this.bodyClick} 
            dangerouslySetInnerHTML={this.renderMarkup()}></blockquote>
        </div>
        {form}
      </div>
    )
  }
}
