class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  render () {
    this.link = <BoardLink boardKey={this.state.board.key} boardName={this.state.board.name} />
    return (
      <div>
        {this.link}
        <div id="stats">{this.state.siteInfo.settings.peers} peers,&nbsp;
        {Helpers.formatSizeUnits(this.state.siteInfo.settings.size)}</div>
      </div>
    )
  }
}

class BoardLink extends React.Component {
  render () {
    var display = "none"
    if (!!this.props.boardName) {
      display = "inline-block"
    }
    return(
      <span style={{display}}>
        <a href={Helpers.fixLink(`?/${this.props.boardKey}/`)} 
          className="board-name" target="_parent">{this.props.boardName}</a>
        &nbsp;on&nbsp;
        <a href={Helpers.fixLink("/0chan.bit")} target="_parent" 
          id="nullchan-link" className="to-main">0chan.bit</a>
      </span>
    )
  } 
}