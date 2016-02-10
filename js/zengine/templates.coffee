class Templates
  constructor: ->
    @templates = {}
    for script in document.getElementsByClassName("template")
      name = script.id.replace("-template", "")
      @templates[name] = script.innerHTML.trim()
      Mustache.parse(@templates[name])

  render: (templateName, data) =>
    Mustache.render(@templates[templateName], data)

  fixLinks: =>
    return unless document.location.pathname == "/"
    for el in document.getElementsByClassName("update-link-in-chrome")
      href = el.getAttribute("href")
      continue if href.substring(0, 2) == "//"
      el.href = "/" + href

  wrapNode: (html) =>
    el = document.createElement("div")
    el.innerHTML = html
    return el.childNodes[0]

window.Templates = new Templates()
