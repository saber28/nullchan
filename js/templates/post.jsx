import React      from "react"
import Helpers    from "../libs/helpers.jsx"
import Form       from "./form.jsx"
import { Attachment, AttachmentOld } from "./attachment.jsx"

export default class Reflinks extends React.Component {
  generateURL(link) {
    let short = link.key.substring(22, 32)
    return Helpers.fixLink(`?${Nullchan.currentBoard.key}/thread/${link.parent}/hl-${short}`) 
  }

  bodyClick(event) {
    let link = null

    if (event.target.className == "reflink") {
      link = event.target
    }
    if (event.target.parentNode.className == "reflink") {
      link = event.target.parentNode
    }

    if (!!link) {
      event.preventDefault()
      View.highlightPost(link.dataset.hash, link.href)
    }
  }


  render() {
    let links = (Threads.reflinkMap[this.props.post] || []).map((ref) => {
      let post = Threads.shortMap[ref]
      return {
        key:    post.hashsum,
        short:  ref,
        num:    Threads.hashToNum[post.hashsum],
        parent: (post.parent || post.hashsum)
      }
    }).sort((a, b) => { return a.num - b.num })

    return <div className="reflinks" onClick={this.bodyClick}>
      {links.map((link) => {
        return <a 
          href={this.generateURL(link)} 
          className="reflink" data-hash={link.short} key={"ref" + link.short}>&gt;&gt;{link.num}</a>
      })}
    </div>
  }
}

export default class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  shortHashsum() {
    return this.state.data.hashsum.substring(22, 32)
  }

  postNum() {
    return Threads.hashToNum[this.state.data.hashsum] || this.shortHashsum()
  }

  userName() {
    return Nullchan.shortUserName(this.state.data.cert_user_id)
  }

  formattedTime() {
    return Helpers.timeSince(this.state.data.created_at)
  }

  renderMarkup() {
    return { __html: Markup.render(this.state.data.body, this) }
  }

  highlight() {
    this.wrapper.scrollIntoView()
    this.setState({highlighted: true})
    setTimeout((() => { this.setState({highlighted: false}) }).bind(this), 2000)
  }

  bodyClick(event) {
    let link = null

    if (event.target.className == "reflink") {
      link = event.target
    }
    if (event.target.parentNode.className == "reflink") {
      link = event.target.parentNode
    }

    if (!!link) {
      event.preventDefault()
      View.highlightPost(link.dataset.hash, link.href)
    }
  }

  callForm() {
    if (View.formBlurred || this.state.showForm) {
      return
    }

    if (!!View.postWithReplyForm) {
      View.postWithReplyForm.setState({showForm: false})
      if (!!View.rReplyForm) {
        View.rReplyForm.stashText()
      }
    }
    View.postWithReplyForm = this
    this.setState({showForm: true}, () => { 
      View.rReplyForm.called(`>>${this.shortHashsum()}\n`)
    })    
  }

  render() {
    let klass   = "post"
    let button  = ""
    let picture = ""
    let form    = ""
    let reply   = "reply"

    let replyClassName  = "post-reply-button"
    let userNameClass   = ""
    let infoClassName   = "info"

    if (!!this.state.highlighted) {
      klass += " highlighted"
    }

    if (!!this.state.data.parent) {
      klass += " reply"
    } else {
      klass += " opening"
      if (Nullchan.currentPage == "list") {
        button = <a target="_parent" className="thread-link" 
          href={Helpers.fixLink(`?/${this.state.data.board}/thread/${this.state.data.hashsum}`)}>
            [Reply]
        </a>
      }
    }

    if (!!this.state.data.attachment) {
      infoClassName += " with-file"
      klass += " with-file"
      picture = <Attachment data={this.state.data} />
    } else if (!!this.state.data.file_thumb) {
      picture = <AttachmentOld urlFull={this.state.data.file_full} urlThumb={this.state.data.file_thumb} />
    }

    if (this.state.data.body.length > 0) {
      klass += " not-empty"
    }


    if (this.state.showForm == true) {
      form = <Form hidden={false} ref={(f) => View.rReplyForm = f} 
        isReply={true} parent={this.state.data.parent || this.state.data.hashsum} />
      reply = "replying"
      replyClassName += " shown"
    }

    if (this.state.data.anonymous) {
      userNameClass = "anonymous"
    }

    return(
      <div className="post-wrapper" ref={(r) => { this.wrapper = r }}>
        <div className={klass}
          data-hashsum={this.state.data.hashsum} id={`post-${this.state.data.hashsum}`}>
          <div className={infoClassName}>
            <div className="time-and-id">
              <strong className={userNameClass}>
                {!!this.state.data.anonymous ? "Anonymous" : `${this.userName()}`}
              </strong>
              &nbsp;
              {this.formattedTime()},
              &nbsp;
              <em className="post-id" onClick={this.callForm.bind(this)}>No.{this.postNum()}</em>
              <Reflinks post={this.shortHashsum()} />
            </div>
            {button}
          </div>
          {picture}
          <blockquote className="text" onClick={this.bodyClick} ref={ (b) => {
            if (b != null) {
              this.text = b
            }
          }}
            dangerouslySetInnerHTML={this.renderMarkup()}></blockquote>
        </div>
        {form}
      </div>
    )
  }
}
