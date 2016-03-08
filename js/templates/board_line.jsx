import React    from "react"
import Helpers  from "../libs/helpers.jsx"

export default class BoardLine extends React.Component {
  render () {
    let unread = ""
    if (this.props.data.unread > 0) {
      unread = `+${this.props.data.unread}`
    }
    return (
      <tr>
        <td className="unread">{unread}</td>
        <td>
          <a target="_parent" href={Helpers.fixLink(`?/${this.props.data.key}/`)}>{this.props.data.name}</a>
        </td>
      </tr>
    )
  }
}
