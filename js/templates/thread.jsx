import React    from "react"
import SkipGap  from "./skip_gap.jsx"
import Post     from "./post.jsx"

export default class Thread extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  render() {
    let skip = ""
    let linkToList = ""
    let rest = 1
    if (this.state.full == false) {
      let count = this.state.posts.length -6
      if (count > 0) {
        skip = <SkipGap count={count} parent={this.state.posts[0].hashsum} />
        rest = this.state.posts.length - 5
      }
    }


    return (
      <div id={`thread-${this.state.posts[0].hashsum}`} className="thread">
        <Post data={this.state.posts[0]} ref={ (t) => {
          if (t != null) {
            Threads.entMap[t.shortHashsum()] = t
          }
        }} />
        {skip}
        {this.state.posts.slice(rest, this.state.posts.length).map((post) => {
          return <Post data={post} key={post.hashsum} ref={ (t) => {
            if (t != null) {
              Threads.entMap[t.shortHashsum()] = t
            }
          }} />
        })}
      </div>
    )
  }
}
