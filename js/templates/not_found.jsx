class NotFound extends React.Component {
  render () {
    return (
      <div id="not-found">
        <h1>Nothing found.</h1>
        <a target="_parent" href={Helpers.fixLink("/0chan.bit")}>return to index</a>
      </div>
    )
  }
}