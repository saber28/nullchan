class Post extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  shortHashsum () {
    return this.state.data.hashsum.substring(22, 32)
  }

  userName () {
    return Nullchan.shortUserName(this.state.data.cert_user_id)
  }

  formattedTime () {
    return Helpers.timeSince(this.state.data.created_at)
  }

  renderMarkup () {
    return { __html: Markup.render(this.state.data.body) }
  }

  bodyClick (event) {
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

  callForm () {
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

  render () {
    var klass   = "post"
    var button  = ""
    var picture = ""
    var form    = ""

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

    if (!!this.state.data.file_thumb) {
      picture = <a href={this.state.data.file_full} target="_blank">
        <img className="attachment" src={this.state.data.file_thumb} />
      </a>
    }

    if (this.state.showForm == true) {
      form = <Form hidden={false} ref={(f) => View.rReplyForm = f} 
        isReply={true} parent={this.state.data.parent || this.state.data.hashsum} />
    }

    return (
      <div className="post-wrapper">
        <div className={klass}
          data-hashsum={this.state.data.hashsum} id={`post-${this.state.data.hashsum}`}>
          <div className="info">
            <div className="time-and-id">
              <span>
                {!!this.state.data.anonymous ? "Anonymous" : `${this.userName()}`}
                &nbsp;wrote&nbsp;
                {this.formattedTime()},
              </span>
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

class Thread extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  render() {
    var skip = ""
    var rest = 1
    if (this.state.full == false) {
      var count = this.state.posts.length -6
      if (count > 0) {
        skip = <SkipGap count={count} parent={this.state.posts[0].hashsum} />
        rest = this.state.posts.length - 5
      }
    }

    return (
      <div id={`thread-${this.state.posts[0].hashsum}`} className="thread">
        <Post data={this.state.posts[0]} />
        {skip}
        {this.state.posts.slice(rest, this.state.posts.length).map((post) => {
          return <Post data={post} key={post.hashsum} />
        })}
      </div>
    )
  }
}

class SkipGap extends React.Component {
  handleClick () {
    View.rBoardPage.threadMap[this.props.parent].setState({full: true})
  }

  render() {
    return (
      <div className="skip-gap" onClick={this.handleClick.bind(this)}>
        {this.props.count} post(s) omitted. ↕ <span className="expand-button">
          expand
        </span>
      </div>
    )
  }
}