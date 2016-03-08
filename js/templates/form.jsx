import React    from "react"
import AuthForm from "./auth_form.jsx"

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  called(selectedText = null) {
    this._textarea.focus()
    if (!!selectedText) {
      this._textarea.value = this._textarea.value + selectedText
    }
  }

  showBlur() {
    View.formBlurred = true
    this._node.className = "form loading"
  }

  hideBlur() {
    View.formBlurred = false
    this._node.className = "form"
  }

  clear() {
    this._node.reset()
  }

  handleSubmit(event) {
    event.preventDefault()
    var data = this.collectFormData()
    if (data == false) {
      this.hideBlur()
      return
    }
    this.showBlur()

    Images.process(data).then((modifiedData) => {
      Files.uploadPost(modifiedData).then((newPost) => {
        this.hideBlur()
        this.clear()
        SeenCount.setLocalCounter(Nullchan.currentBoard.key, true)

        if (!!this.state.parent) {
          if (!!View.postWithReplyForm) {
            View.postWithReplyForm.setState({showForm: false})
            View.postWithReplyForm = null
          }
          Threads.appendPost(newPost)
          setTimeout(() => { SeenCount.setLocalCounter(Nullchan.currentBoard.key) }, 2000)
        } else {
          View.rBoardPage.setState({formShown: false})
          Nullchan.determineRoute()
        }
      })
    }).catch((err) => {
      alert(err)
      this.hideBlur()
      return
    })
  }

  collectFormData() {
    var result = {
      body:       this._node.getElementsByClassName("text")[0].value.trim(),
      file:       this._node.getElementsByClassName("file")[0].files[0],
      created_at: Helpers.unixTimestamp(),
      parent:     this._node.getElementsByClassName("parent")[0].value,
    }
    if (!!!result.parent) {
      result.parent = null
    }
    var name = this._node.getElementsByClassName("name")[0]
    result.anonymous = (name.options[name.selectedIndex].value == "anonymous")

    if (!!!result.file && result.body == "") {
      alert("Your post is empty")
      return false
    }
    return result
  }

  render() {
    var display = "block"
    var id      = "top-form"

    if (this.props.hidden == true) {
      display = "none" 
    }

    if (this.props.isReply == true)  {
      id = "reply-form"
    }

    return (
      <form id={id} className="form" style={{display}} 
        onSubmit={this.handleSubmit.bind(this)} ref={(f) => this._node = f}>
        <div className="form-preloader">
          <span>
            sending your message...
          </span>
        </div>
        <table>
          <tbody>
            <tr>
              <td>Comment</td>
              <td>
                <textarea placeholder="Up to 3000 symbols, required if no file attached" 
                  name="body" className="text" ref={(t) => this._textarea = t}>
                </textarea>
                <input type="hidden" name="parent" className="parent" value={this.state.parent} />
              </td>
            </tr>
            <tr>
              <td>File</td>
              <td>
                <input type="file" name="file" className="file"/>
              </td>
            </tr>
            <tr>
              <td>Sign as</td>
              <td>
                <AuthForm ref={(a) => View.rAuthForm = a} userName={Nullchan.shortUserName()} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}
