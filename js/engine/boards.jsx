class Boards {
  get list () { return this._list }

  constructor () {
    this._list = []
  }

  getByKey (key) {
    for (let board of this.list) {
      if (board.key == key) {
        return board
      }
    }
    return null
  }

  reload () {
    return new Promise((resolve) => {
      window.Nullchan.reloadEngineSettings().then(() => {
        this._list = window.Nullchan.engineSettings.boards
        SeenCount.getUnread().then((unreads) => {
          for (let i in this.list) {
            this._list[i].unread = unreads[this.list[i].key]
          }
          resolve()
        }
      )
    })})
  }
}
window.Boards = new Boards
