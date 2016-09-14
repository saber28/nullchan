import React    from "react"
import Helpers  from "../libs/helpers.jsx"

export default class Reflink extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  targetData() {
    return Threads.shortMap[this.state.targetShortHash]
  }

  targetComponent() {
    return Threads.entMap[this.state.targetShortHash]
  }

  targetURL() {
    return Helpers.fixLink(`?${Nullchan.currentBoard.key}/thread/` + 
      `${this.targetData().parent}/hl-${this.state.targetShortHash}`) 
  }

  targetNum() {
    return this.targetData().num || this.state.targetShortHash
  }

  bodyClick(event) {
    event.preventDefault()
    if (!!this.targetData()) {
      View.scrollToPost(this.state.targetShortHash, this.targetURL())
    }
  }

  mouseEnter() {
    if (!!this.targetComponent()) {
      this.targetComponent().highlight()
    }
  }

  mouseLeave() {
    if (!!this.targetComponent()) {
      this.targetComponent().removeHighlight()
    }
  }

  render() {
    if (!!this.targetData()) {
      return <a
        onClick={this.bodyClick.bind(this)}
        onMouseEnter={this.mouseEnter.bind(this)}
        onMouseLeave={this.mouseLeave.bind(this)}
        href={this.targetURL()}
        className="reflink"
      >&gt;&gt;{this.targetNum()}</a>
    } else {
      return <a href="#" onClick={this.bodyClick.bind(this)} className="reflink dead">
        &gt;&gt;<em>{this.state.targetShortHash}</em> (post not found)
      </a>
    }
  }
}
