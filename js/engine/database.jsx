class Database {
  static execute (query) {
    return new Promise((resolve) => {
      Nullchan.cmd("dbQuery", query.trim(), (response) => { resolve(response) })
    })
  }

  static getLastPost () {
    return new Promise((resolve) => {
      var query = `
        SELECT message.* FROM message
        ORDER BY message.created_at DESC LIMIT 1
      `
      this.execute(query).then((response) => { resolve(response[0]) })
    })
  }

  static getMessageCountByBoard () {
    return new Promise((resolve) => {
      var query = "SELECT message.board, COUNT(*) FROM message GROUP BY board"
      this.execute(query).then((response) => {
        var result = {}
        for (let count of response) {
          result[count.board] = count["COUNT(*)"]
        }
        resolve(result)
      })
    })
  }

  static loadMessages (boardKey) {
    return new Promise((resolve) => {
      var query = `
        SELECT message.*, keyvalue.value AS cert_user_id FROM message
        LEFT JOIN json AS data_json USING (json_id)
        LEFT JOIN json AS content_json ON (
          data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
        )
        LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
        WHERE message.board = '${boardKey}'
      `
      this.execute(query).then((response) => { resolve(response) })
    })
  }
}

