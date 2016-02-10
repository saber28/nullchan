class Header
  @element = null

  constructor: ->
    @element = document.getElementById("header")

  update: (siteInfo, settings) =>
    @element.outerHTML = Templates.render "header", 
      boardName:  Nullchan.currentBoard?.name
      boardAbbr:  Nullchan.currentBoard?.abbr
      peers:      siteInfo.settings.peers
      siteSize:   formatSizeUnits(siteInfo.settings.size)
      noLink:     (Nullchan.currentBoard == null)

    @element = document.getElementById("header")

window.Header = new Header()

