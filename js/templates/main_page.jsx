class BoardLine extends React.Component {
  render () {
    var unread = ""
    if (this.props.data.unread > 0) {
      unread = `+${this.props.data.unread}`
    }
    return (
      <tr>
        <td className="unread">{unread}</td>
        <td>
          <a href={Helpers.fixLink(`?/${this.props.data.key}/`)}>{this.props.data.name}</a>
        </td>
      </tr>
    )
  }
}

class MainPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  render () {
    return(
      <div id="glagne" key={"mainpage"}>
        <pre id="logo">
          <code>{`
  /$$$$$$            /$$                          
 /$$$_  $$          | $$                          
| $$$$\\ $$  /$$$$$$$| $$$$$$$   /$$$$$$  /$$$$$$$ 
| $$ $$ $$ /$$_____/| $$__  $$ |____  $$| $$__  $$
| $$\\ $$$$| $$      | $$  \\ $$  /$$$$$$$| $$  \\ $$
| $$ \\ $$$| $$      | $$  | $$ /$$__  $$| $$  | $$
|  $$$$$$/|  $$$$$$$| $$  | $$|  $$$$$$$| $$  | $$
 \\______/  \\_______/|__/  |__/ \\_______/|__/  |__/
          `}</code>
        </pre>
        <hr/>
        <blockquote className="monospace">
          fork me on <a href="https://github.com/Nullchan/nullchan" target="_parent">GitHub</a> (v {VERSION})
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
                <span>
                  last post: <em id="last-post">{this.state.lastPostTime}</em>
                </span>
              </td>
              <td>
                <blockquote>
                  <strong>0chan</strong> is an imageboard engine<br/>currently in development.
                  <br/><br/>
                  <em style={{color: "orange !important"}}>To 8ch newfriends</em>: welcome! Sorry about the 
                  mess, this site is still very fresh and raw. I didn't advertise it on 8ch, some random guy did. 
                  This is basically just a tech demo which misses a lot of features that you're accustomed to, 
                  but it will get better with time.
                  <br/>
                  <br/>
                  <hr/>
                  <span>
                    <em>Current development status:</em>
                    Investigating image processing errors (15.02.2016)
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
          message me on <a href={Helpers.fixLink("/Mail.ZeroNetwork.bit/?to=sthetz")} target="_parent">ZeroMail</a>
        </blockquote>
      </div>
    )
  }
}