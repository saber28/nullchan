import Database from "./database.jsx"
import Helpers  from "../libs/helpers.jsx"

class Threads {
  get cachedPosts () { return this._cachedPosts }
  get shortMap    () { return this._shortMap    }
  get entMap      () { return this._entMap      }
  get numToHash   () { return this._numToHash   }
  get hashToNum   () { return this._hashToNum   }
  get reflinkMap  () { return this._reflinkMap  }

  get lastPostTime () { 
    if (!this._lastPost) {
      return "N/A"
    }
    return Helpers.timeSince(this._lastPost.created_at) 
  }

  get totalPosts () { 
    if (!this._totalPosts) {
      return "N/A"
    }
    return this._totalPosts
  }

  constructor () {
    this._shortMap    = {}
    this._cachedPosts = {}
    this._entMap      = {}
    this._numToHash   = {}
    this._hashToNum   = {}
    this._reflinkMap  = {}
  }

  registerReflink(fromHash, toHash) {
    if (!!!this._reflinkMap[toHash]) {
      this._reflinkMap[toHash] = []      
    }
    this._reflinkMap[toHash].push(fromHash)
  }

  loadNumbers() {
    return new Promise((resolve) => {
      Database.loadHashesAndTimestamps(Nullchan.currentBoard.key).then((hashes) => {
        for (var i = hashes.length - 1; i >= 0; i--) {
          this.numToHash[i + 1] = hashes[i]
          this.hashToNum[hashes[i]] = i + 1
        }
        resolve()  
      })
    })
  }

  updateLastPost () {
    return new Promise((resolve) => {
      Database.getLastPost().then((post) => {
        this._lastPost = post
        Database.getTotalCount().then((total) => {
          this._totalPosts = total
          resolve()
        })
      }).catch((err) => { resolve() }) // anyway
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

      post.body.replace(/>>(\w+)/mg, (match, shortHash) => {
        this.registerReflink(post.hashsum.substring(22, 32), shortHash)
      })

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
window.Threads = new Threads()
