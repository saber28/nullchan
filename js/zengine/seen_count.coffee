class SeenCount
  actualCounter: null

  getActualCounter: =>
    new Promise (fulfill, reject) =>
      if @actualCounter != null
        fulfill(@actualCounter)
      else
        updateActualCounter().then => fulfill(@actualCounter)

  updateActualCounter: => 
    new Promise (fulfill, reject) =>
      Database.messageCountByBoard().then (counter) => 
        @actualCounter = counter
        fulfill()

  setLocalCounter: (boardAbbr) =>
    @getActualCounter().then (actualCounter) =>
      @getLocalCounter().then (localCounter) =>
        localCounter[boardAbbr] = actualCounter[boardAbbr]
        data = {}
        for board in BoardList.boards
          data["msg_#{board.abbr}"] = localCounter[board.abbr] || 0
        Nullchan.cmd "wrapperSetLocalStorage", data

  getLocalCounter: =>
    new Promise (fulfill, reject) =>
      Nullchan.cmd "wrapperGetLocalStorage", [], (response) =>
        result = {}
        response ?= {}
        for board in BoardList.boards 
          result[board.abbr] = response["msg_#{board.abbr}"] || 0
        fulfill(result)

  getUnread: =>
    new Promise (fulfill, reject) => 
      @getActualCounter().then (actualCounter) =>
        @getLocalCounter().then (localCounter) =>
          result = {}
          for board in BoardList.boards
            if localCounter[board.abbr] > 0
              result[board.abbr] = actualCounter[board.abbr] - localCounter[board.abbr]
          fulfill(result)

window.SeenCount = new SeenCount
