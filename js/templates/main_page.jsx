import React      from "react"
import BoardLine  from "./board_line.jsx"
import Logo       from "./logo.jsx"
import Helpers    from "../libs/helpers.jsx"
import VERSION    from "../engine/version.jsx"

export default class MainPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  render () {
    let logo = <Logo />

    return(
      <div id="glagne" key={"mainpage"}>
        {logo}
        <hr/>
        <blockquote className="monospace">
          powered by <a href="https://github.com/Nullchan/nullchan" target="_parent">Nullchan engine</a> (v {VERSION})
        </blockquote>

        <hr/>
        <div className="inner">
          <table>
            <tbody>
            <tr>
              <td className="board-list-container">
                <table id="board-list">
                  <tbody>
                    {this.state.boards.map((board) => {
                       return <BoardLine key={board.key} data={board}/>
                    })}
                  </tbody>
                </table>
                <span className="counters">
                  last post: <em id="last-post">{this.state.lastPostTime}</em>
                  <br/>
                  total posts: <em id="total-posts">{this.state.totalPosts}</em>
                </span>
              </td>
              <td>
                <blockquote>
                  <strong>{Nullchan.engineSettings.siteName}</strong> is a decentralised P2P imageboard
                  powered by <a href="https://github.com/Nullchan/nullchan" target="_parent">Nullchan</a> engine
                  running on <a href="https://github.com/HelloZeroNet/ZeroNet" target="_parent">ZeroNet</a>.
                  <br/><br/>
                  The engine is still very early in development and thus this site is basically 
                  just a proof-of-concept tech demo which misses a lot of crucial features, 
                  but it will get better with time.
                  <br/>
                  <br/>
                  <hr/>
                  <span>
                    <em>Status:</em>
                    Did some restyling, working on post previews and GIF support now.
                    <br/><br/>
                    11.09.2016
                  </span>
                  <br/>
                  &nbsp;
                </blockquote>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr/>
        <blockquote className="monospace">
          message the devs on <a href={Helpers.fixLink("/Mail.ZeroNetwork.bit/?to=sthetz")} target="_parent">ZeroMail</a>
        </blockquote>
      </div>
    )
  }
}
