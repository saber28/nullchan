import Helpers from "../libs/helpers.jsx"

export default class Database {
  static execute (query) {
    return new Promise((resolve) => {
      Nullchan.cmd("dbQuery", query.trim(), (response) => { resolve(response) })
    })
  }

  static getLastPost () {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT message.* FROM message
        ORDER BY message.created_at DESC LIMIT 10
      `
      this.execute(query).then((response) => { 
        let now = Helpers.unixTimestamp()
        for (let post of response) {
          if (post.created_at > now) {
            continue
          }
          resolve(post)
          break
        }

        reject()
      })
    })
  }

  static getMessageCountByBoard () {
    return new Promise((resolve) => {
      let query = "SELECT message.board, COUNT(*) FROM message GROUP BY board"
      this.execute(query).then((response) => {
        let result = {}
        for (let count of response) {
          result[count.board] = count["COUNT(*)"]
        }
        resolve(result)
      })
    })
  }

  static loadSingleThread (boardKey, threadHash) {
    return new Promise((resolve) => {
      let query = `
        SELECT message.*, keyvalue.value AS cert_user_id FROM message
        LEFT JOIN json AS data_json USING (json_id)
        LEFT JOIN json AS content_json ON (
          data_json.directory = content_json.directory AND content_json.file_name = 'content.json'
        )
        LEFT JOIN keyvalue ON (keyvalue.key = 'cert_user_id' AND keyvalue.json_id = content_json.json_id)
        WHERE message.board = '${boardKey}' AND
        (message.hashsum = '${threadHash}' OR message.parent = '${threadHash}')
        ORDER BY message.created_at ASC
      `
      this.execute(query).then((response) => { 
        resolve(response) 
      })
    })
  }

  static loadMessagesOnBoard (boardKey) {
    return new Promise((resolve) => {
      let query = `
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

