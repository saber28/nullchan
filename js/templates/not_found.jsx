class NotFound extends React.Component {
  render () {
    return (
      <div id="not-found">
        <h1>Nothing found.</h1>
        <a target="_parent" href={Helpers.fixLink(`/${Nullchan.engineSettings.siteAddress}`)}>return to index</a>
      </div>
    )
  }
}