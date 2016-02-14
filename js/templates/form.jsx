class Form extends React.Component {
  called (selectedText = null) {
    console.log("CALLED!")
    this._textarea.focus()
    if (!!selectedText) {
      this._textarea.value = this._textarea.value + selectedText
    }
  }

  render () {
    var display = "block"
    var id      = "top-form"

    if (this.props.hidden == true) {
      display = "none" 
    }

    if (this.props.isReply == true)  {
      id = "reply-form"
    }

    return (
      <form id={id} className="form" style={{display}}>
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
                <input type="hidden" name="parent" className="parent"/>
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
