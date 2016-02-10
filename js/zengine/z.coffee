class Nullchan extends ZeroFrame
  initialized:  false
  settings:     null
  siteInfo:     null
  container:    null
  preloader:    null
  page:         null
  currentBoard: null
  optionalIsSet:false
  currentPath:  []

  init: =>
    @container = document.getElementById("container")
    @preloader = document.getElementById("preloader")    

  onOpenWebsocket: (event) =>
    unless @initialized
      @initialized = true
      @loadSiteInfo().then (newInfo) =>
        @updateSiteInfo(newInfo)
        @determineRoute()

  onRequest: (command, message) =>
    if command == "setSiteInfo"
      @updateSiteInfo(message)

  updateSiteInfo: (newInfo) =>
    @siteInfo = newInfo
    @updateHeader()
    Forms.updateAuthForms()

  updateHeader: => 
    Header.update(@siteInfo, @settings)

  currentPage: => 
    @page

  loadSiteInfo: =>
    new Promise (fulfill, reject) =>
      @cmd "siteInfo", {}, (newInfo) => fulfill(newInfo)

  determineRoute: =>
    BoardList.reloadBoardList().then => 
      @grepPath()
      promise = null

      @log(@currentPath)

      if @currentPath.length == 0
        @page = "main"
        promise = @showMainPage()
      else if (board = BoardList.get(@currentPath[0])) != null
        @currentBoard = board
        if @currentPath.length == 1
          @page = "list"
          promise = Threads.showList()
        else if @currentPath[1] == "thread"
          @page = "thread"
          promise = Threads.showThread(@currentPath[2])

      if promise == null 
        @renderNotFound()
        @togglePreloader(false)
        return
      promise?.then => @togglePreloader(false)

  grepPath: =>
    result = []
    for part in window.location.search.substring(1).split("/")
      if part.indexOf("wrapper_nonce") != -1
        part = part.split("wrapper_nonce")[0]
      part = part.replace(/ /g,'')
      if part[part.length-1] == "&"
        part = part.substring(0, part.length-1)
      continue if part == "" or part == "&"
      
      result.push(part)
    @currentPath = result

  showMainPage: =>
    new Promise (fulfill, reject) =>
      @container.innerHTML = Templates.render("mainpage")
      @updateHeader()
      BoardList.renderMainPageBoardList().then => fulfill()

  getSiteInfo: =>
    return @siteInfo

  togglePreloader: (state) =>
    if state == true
      inactive = container
      active   = preloader
    else
      inactive = preloader
      active   = container

    inactive.style.display = "none"
    active.style.display   = "block"
    active.className       = "fadein"
    setTimeout (=> on.className = ""), 1100

  shortUserName: (full) =>
    if !full
      full = @siteInfo.cert_user_id
    if full == "edisontrent@zeroid.bit"
      return "[dev] edisontrent"
    if !full
      return full
    return full.split("@")[0]

  displayError: (text) =>
    @cmd("wrapperNotification", ["error", text, 5000])

  renderNotFound: =>
    @container.innerHTML = Templates.render("not-found")

  publishBasicContentJson: =>
    new Promise (fulfill, reject) =>
      path = "data/users/#{@siteInfo.auth_address}/test.txt"
      @cmd "fileWrite", [path, btoa("fuck this")], (write) =>
        @log("basic write: #{write}")
        @cmd "siteSign", {inner_path: path}, (basicResponse) =>
          @log("basic responseon sign: #{JSON.stringify(basicResponse)}")
          @cmd "fileGet", "data/users/#{@siteInfo.auth_address}/content.json", (contentJson) =>
            fulfill(contentJson)

  checkOptionalSet: =>
    @log("Checking optional.")
    new Promise (fulfill, reject) =>
      if @optionalIsSet == true
        @log("Already checked! Nothing more to do!")
        fulfill()
        return

      path = "data/users/#{@siteInfo.auth_address}/content.json"
      @cmd "fileGet", path, (contentJson) =>
        @log("fileGet on content.json: #{contentJson}")
        unless contentJson
          @log("NO FILE! Got to create basic file")
          @publishBasicContentJson().then (contentJson) => 
            @log("Basic file created: #{contentJson}, setting optional to it")
            @setOptional(contentJson).then => fulfill()
        else
          data = JSON.parse(contentJson)
          unless data?.optional == ".*\\.(png|jpg|gif)"   
            @log("optional isn't set, setting")
            @setOptional(contentJson).then => fulfill()
          else
            @log("optional is already set, can rest now")
            @optionalIsSet = true
            fulfill()

  setOptional: (strJson) =>
    new Promise (fulfill, reject) =>
      path = "data/users/#{@siteInfo.auth_address}/content.json"
      data = JSON.parse(strJson)
      data.optional = ".*\\.(png|jpg|gif)"
      json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
      @log("Setting optional now!")
      @log("Json raw: #{json_raw}")
      @cmd "fileWrite", [path, btoa(json_raw)], (write) =>
        @log("Write on #{path}: #{write}")
        if write != "ok"
          alert(JSON.stringify(write))
          alert("Sorry, still testing this one")
        @cmd "sitePublish", {inner_path: path}, (signResponse) =>
          @log("sitePublish result: #{JSON.stringify(signResponse)}")
          @optionalIsSet = true
          fulfill()




# @cmd "sitePublish", { sign: false }, (signResponse) =>
#   @log("sitePublish result: #{JSON.stringify(signResponse)}")
#   path = "data/users/#{@siteInfo.auth_address}/content.json"
#   @cmd "fileGet", path, (fileContent) =>
#     @log("fileGet response: #{JSON.stringify(fileContent)}")
#     data = JSON.parse(fileContent)
#     data.optional = ".*\\.(png|jpg|gif)"
#     json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')))
#     @log("Json raw: #{json_raw}")
#     @cmd "fileWrite", [path, btoa(json_raw)], (write) =>
#       @log("Write on #{path}: #{write}")
#       if write != "ok"
#         alert(JSON.stringify(write))
#         alert("Sorry, still testing this one")
#       @optionalIsSet = true
#       fulfill()


  uploadFile: (rawBase64, fileName, publish) =>
    new Promise (fulfill, reject) =>
      @checkOptionalSet().then =>
        dir  = "data/users/#{@siteInfo.auth_address}/"
        path = (dir + fileName)

        @cmd "fileWrite", [path, rawBase64], (write) =>
          if write == "ok"
            if publish == false
              fulfill(path)
            else
              @cmd "sitePublish", { "inner_path": path }, (publish) =>
                if publish == "ok"
                  fulfill(path)
                else
                  reject(publish)
          else 
            reject(write)

window.Nullchan = new Nullchan()
