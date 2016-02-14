class Threads {
  get cachedPosts () { return this._cachedPosts }

  get lastPostTime () { 
    if (!this._lastPost) {
      return "N/A"
    }
    return Helpers.timeSince(this._lastPost.created_at) 
  }

  updateLastPost () {
    return new Promise((resolve) => {
      Database.getLastPost().then((post) => {
        this._lastPost = post
        resolve()
      })
    })
  }

  load () {
    return new Promise((resolve) => {
      Database.loadMessages(Nullchan.currentBoard.key).then((messages) => {
        var posts   = {}
        var threads = []

        for (let post of messages) {
          let threadHash = (post.parent || post.hashsum) 
          if (!!!posts[threadHash]) {
            posts[threadHash] = { opening: null, replies: [] }
          }
          if (post.parent == null) {
            posts[threadHash].opening = post
          } else {
            posts[threadHash].replies.push(post)
          }
        }

        this._cachedPosts = posts
        for (let hash in this.cachedPosts) {
          let post = this.cachedPosts[hash]
          if (!!!post.opening) {
            continue
          }
          threads.push([post.opening].concat(post.replies.sort(this.sortPosts)))
        }
        resolve(threads.sort(this.sortThreads))
      })
    }) 
  }

  sortPosts (a, b) {
    if (a.created_at > b.created_at) {
      return 1
    }
    return -1
  }

  sortThreads (a, b) {
    if (a[a.length-1].created_at > b[b.length-1].created_at) {
      return -1
    }
    return 1
  }
}

window.Threads = new Threads
