class BoardList
  boards: []

  get: (name) =>
    for board in @boards
      return board if board.abbr == name
    return null

  reloadBoardList: (forceReload = false) =>
    new Promise (fulfill, reject) =>
      if forceReload == false and @boards.length > 0
        return fulfill()
      Nullchan.cmd "fileGet", "data/boards.json", (data) =>
        @boards = JSON.parse(data).boards
        fulfill()

  renderMainPageBoardList: =>
    new Promise (fulfill, reject) =>
      @reloadBoardList().then =>
        container = document.getElementById("board-list")
        container.outerHTML = Templates.render("board-list", boards: @boards)
        @updateLastPost()
        fulfill()

  updateLastPost: =>
    return if Nullchan.currentPage() != "main"
    query = "SELECT message.* FROM message ORDER BY message.created_at DESC LIMIT 1"
    Nullchan.cmd 'dbQuery', query, (data) =>
      if data[0]?.created_at
        text = Time.since(data[0].created_at)
      else
        text = "N/A"
      document.getElementById("last-post").innerHTML = text

window.BoardList = new BoardList

