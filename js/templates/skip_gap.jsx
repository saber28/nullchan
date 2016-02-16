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
