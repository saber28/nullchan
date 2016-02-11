class Markup
  htmlEntityMap: {
    "&": "&amp;"
    "<": "&lt;"
    ">": "&gt;"
    '"': '&quot;'
    "'": '&#39;'
    "/": '&#x2F;'
  }
  
  expressions: [
    # reflinks
    # [/&gt;&gt;(\w{10})/, ((match, content) ->
    #   "<a href=\"##{match[1]}\">&gt;&gt;#{content}</a>"
    # )],

    # quote
    [/^\s*&gt;\s{0,1}(.+?)$/mg, ((match, content) ->
      br = "";
      if match[0] == "\n"
        br = "<br>"

      return (br + "<em class='quote'>&gt; " + content + "</em>")
    )],

    # bold
    [/\*\*([\s\S]+?)\*\*/mg, '<em class="bold">$1</em>'],

    # italic
    [/\*([\s\S]+?)\*/mg, '<em class="italic">$1</em>'],

    # underline
    [/(^|\s|\A)__([\s\S]+?)__(\s|\z|$)/mg, '$1<em class="underline">$2</em>$3'],

    # strike
    [/\^([\s\S]+?)\^/mg, ((match, text) ->
      if text.match(/^_+$/)
        return match
      ("<em class='strike'>" + text + "</em>")
    )],

    # spoiler 
    [/%%([\s\S]+?)%%/mg, '<em class="spoiler">$1</em>'],

    # line breaks
    [/\r?\n/g, "\n"],
    [/\n/g, '<br>'],
    [/(<br>){2,}/g, '<br><br>'],
  ]

  render: (content) =>
    content = @escapeHTML(content)
    content = content.trim()

    for exp in @expressions 
      content = content.replace(exp[0], exp[1])

    return content

  escapeHTML: (raw) =>
    return String(raw).replace /[&<>"'\/]/g, (s) =>
      return @htmlEntityMap[s]

window.Markup = new Markup()
