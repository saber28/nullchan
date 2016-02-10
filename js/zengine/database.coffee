class Database
  messageCountByBoard: =>
    new Promise (fulfill, reject) =>
      query = "SELECT message.board, COUNT(*) FROM message GROUP BY board"
      Nullchan.cmd "dbQuery", query, (counts) =>
        result = {}
        for count in counts
          result[count.board] = count["COUNT(*)"]
        fulfill(result)

window.Database = new Database
