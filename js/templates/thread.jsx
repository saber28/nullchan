import React    from "react"
import SkipGap  from "./skip_gap.jsx"
import Post     from "./post.jsx"

export default class Thread extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  render() {
    var skip = ""
    var rest = 1
    if (this.state.full == false) {
      var count = this.state.posts.length -6
      if (count > 0) {
        skip = <SkipGap count={count} parent={this.state.posts[0].hashsum} />
        rest = this.state.posts.length - 5
      }
    }

    return (
      <div id={`thread-${this.state.posts[0].hashsum}`} className="thread">
        <Post data={this.state.posts[0]} />
        {skip}
        {this.state.posts.slice(rest, this.state.posts.length).map((post) => {
          return <Post data={post} key={post.hashsum} />
        })}
      </div>
    )
  }
}
