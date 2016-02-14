class FormButton extends React.Component {
  handleClick (event) {
    View.rBoardPage.setState({formShown: true}, () => {
      View.rBoardPage.rForm.called()  
    })
  }

  render () {
    var display = "block"
    if (this.props.hidden == true) {
      display = "none" 
    }

    return (
      <div id="form-call-button" style={{display}}>
        [ <span onClick={this.handleClick}>{this.props.text}</span> ]
      </div>
    )
  }
}
