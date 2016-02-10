class Templates
  constructor: ->
    @templates = {}
    for script in document.getElementsByClassName("template")
      name = script.id.replace("-template", "")
      @templates[name] = script.innerHTML.trim()
      Mustache.parse(@templates[name])

  render: (templateName, data) =>
    Mustache.render(@templates[templateName], data)

  wrapNode: (html) =>
    el = document.createElement("div")
    el.innerHTML = html
    return el.childNodes[0]

window.Templates = new Templates()
