class Threads {
  get cachedPosts () { return this._cachedPosts }
  get shortMap    () { return this._shortMap    }

  get lastPostTime () { 
    if (!this._lastPost) {
      return "N/A"
    }
    return Helpers.timeSince(this._lastPost.created_at) 
  }

  constructor () {
    this._shortMap    = {}
    this._cachedPosts = {}
  }

  updateLastPost () {
    return new Promise((resolve) => {
      Database.getLastPost().then((post) => {
        this._lastPost = post
        resolve()
      })
    })
  }

  loadSingle (threadHash) {
    return new Promise((resolve) => {
      Database.loadSingleThread(Nullchan.currentBoard.key, threadHash).then((messages) => {
        resolve(this.buildThreads(messages))
      })
    })
  }

  buildThreads (messages) {
    let posts      = {}
    let threads    = []

    for (let post of messages) {
      this._shortMap[post.hashsum.substring(22, 32)] = post
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

    return threads.sort(this.sortThreads)
  }

  loadAll () {
    return new Promise((resolve) => {
      Database.loadMessagesOnBoard(Nullchan.currentBoard.key).then((messages) => {
        resolve(this.buildThreads(messages))
      })
    }) 
  }

  appendPost (newPost) {
    this._shortMap[newPost.hashsum.substring(22, 32)] = newPost
    let parentHash = newPost.parent || newPost.hashsum
    if (!!this.cachedPosts[parentHash]) {
      this._cachedPosts[parentHash].replies.push(newPost)
      if (!!View.rBoardPage.threadMap[parentHash]) {
        let thread = this._cachedPosts[parentHash]
        let posts  = [thread.opening].concat(thread.replies.sort(this.sortPosts))
        
        View.rBoardPage.threadMap[parentHash].setState({posts: posts})
      }
    }
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
