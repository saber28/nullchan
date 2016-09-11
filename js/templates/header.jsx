import React    from "react"
import Helpers  from "../libs/helpers.jsx"

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  render () {
    return (
      <div id="board-header"> 
        <h1>/<em>{this.state.board.key}</em>/ — <em>{this.state.board.name}</em></h1>
        <h2>{this.state.board.description}</h2>

        <a href={Helpers.fixLink(`/${Nullchan.engineSettings.siteAddress}`)} 
          target="_parent" className="to-main">[back to all boards]</a>
      </div>
    )
  }
}
