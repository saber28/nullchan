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
        fulfill()

window.BoardList = new BoardList

