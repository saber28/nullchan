import React from "react"

export default class AuthForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  showAuthDialog () {
    Nullchan.cmd("certSelect", [["zeroid.bit"]])
  }

  handleChange (event) {
    let newSign = event.currentTarget.value
    if (newSign == "other") {
      this.showAuthDialog()
      event.preventDefault()
      event.currentTarget.value = "anonymous"
      return
    }
  }

  render () {
    let content
    let submitText = "New Thread"

    if (this.state.isReply) {
      submitText = "New Reply"
    }

    if (!!!this.state.userName) {
      content = <div className="auth-please" onClick={this.showAuthDialog}>
        <u>Authorize</u> to post messages.<br/>
        You will still be able to post anonymously.
      </div>
    } else {
      content = <div>
        <select name="name" className="name" onChange={this.handleChange.bind(this)} defaultValue={"anonymous"}>
          <option value="anonymous" >Anonymous</option>
          <option value="signed">{this.state.userName}</option>
          <option value="other">select other...</option>
        </select>      
        <input type="submit" value={submitText} className="submit" />
      </div>
    }

    return (
      <div className='auth-form'>
        {content}
      </div>
    ) 
  }
}
