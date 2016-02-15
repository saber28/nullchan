class SeenCount {
  get actualCounter () { return this._actualCounter }

  getActualCounter () {
    return new Promise((resolve) => {
      if (!!this.actualCounter) {
        resolve(this.actualCounter)
      } else {
        this.updateActualCounter().then(() => { resolve(this.actualCounter) })
      }
    })
  }

  updateActualCounter () {
    return new Promise((resolve) => {
      Database.getMessageCountByBoard().then((counter) => {
        this._actualCounter = counter
        resolve()
      })
    })
  }

  setLocalCounter (boardKey, forcePlusOne = false) {
    Promise.all([
      this.getActualCounter(),
      this.getLocalCounter(),
    ]).then((data) => {
      let [actual, local] = data
      var storage = {}
      local[boardKey] = actual[boardKey]

      if (forcePlusOne) {
        local[boardKey] = local[boardKey] + 1
      }
      for (let board of Boards.list) {
        storage[`msg_${board.key}`] = local[board.key] || 0
      }
      Nullchan.cmd("wrapperSetLocalStorage", storage)
    })
  }

  getLocalCounter () {
    return new Promise((resolve) => {
      Nullchan.cmd("wrapperGetLocalStorage", [], (response) => {
        if (!!!response) {
          response = {}
        }
        var result = {}

        for (let board of Boards.list) { 
          result[board.key] = response[`msg_${board.key}`] || 0
        }
        resolve(result)
      })
    })
  }

  getUnread () {
    return new Promise((resolve) => {
      Promise.all([
        this.getActualCounter(),
        this.getLocalCounter(),
      ]).then((data) => {
        let [actual, local] = data
        var result = {}
        for (let board of Boards.list) { 
          if (local[board.key] > 0) {
            result[board.key] = actual[board.key] - local[board.key]
          } else {
            result[board.key] = 0
          }
        }
        resolve(result)
      })
    })
  }
}

window.SeenCount = new SeenCount
