import React      from "react"
import Paginator  from "react-pagify"
import segmentize from "segmentize"
import Helpers    from "../libs/helpers.jsx"

export default class PageBox extends React.Component {
  handleSelect(page) {
    let url = `?/${Nullchan.currentBoard.key}/page/${page}` 
    if (page == 0 || page == 1) {
      url = `?/${Nullchan.currentBoard.key}/`
    }
    window.top.location.href = Helpers.fixLink(url)
  }

  render() {
    return(
      <Paginator.Context className="pagify-pagination"
        segments={segmentize({
          page: this.props.currentPage,
          pages: this.props.totalPages,
          beginPages: 1,
          endPages: 6,
          sidePages: 3
        })} 
        tags={{
          link: {
            tag: 'a',
            props: {
              href: "#",
              className: "page-el"
            }
          }
        }}
        ellipsis={'…'}
        onSelect={this.handleSelect}
      >
        Pages: 
        &nbsp;
        &nbsp;
        <Paginator.Segment field="beginPages" />

        <Paginator.Ellipsis className="ellipsis"
          previousField="beginPages" nextField="previousPages">
          ***
        </Paginator.Ellipsis>

        <Paginator.Segment field="previousPages" />
        <Paginator.Segment field="centerPage" className="selected" />
        <Paginator.Segment field="nextPages" />

        <Paginator.Ellipsis className="ellipsis"
          previousField="nextPages" nextField="endPages">
          ***
        </Paginator.Ellipsis>
        <Paginator.Segment field="endPages" />
      </Paginator.Context>
    )
  }
}