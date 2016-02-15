class Markup {
  constructor () {
    this.entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      // "/": '&#x2F;',
    }

    this.expressions = [
      // reflinks 
      [/&gt;&gt;(\w+)/mg, (match, content) => {
        var post = Threads.shortMap[content]
        if (!!!post) {
          return match
        }

        var parent = post.parent || post.hashsum
        var url    = Helpers.fixLink(`/0chan.bit/?/${post.board}/thread/${parent}/${content}`)
        return `<a class="reflink" href="${url}">&gt;&gt;${content}</a>`
      }],

      // quote
      [/^\s*&gt;\s{0,1}(.+?)$/mg, (match, content) => {
        let br = ""
        if (match[0] == "\n") {
          br = "<br />"
        }
        return (br + `<em class='quote'>&gt; ${content}</em>`)
      }],

      // bold
      [/\*\*([\s\S]+?)\*\*/mg, '<em class="bold">$1</em>'],

      // italic
      [/\*([\s\S]+?)\*/mg, '<em class="italic">$1</em>'],

      // underline
      [/(^|\s|\A)__([\s\S]+?)__(\s|\z|$)/mg, '$1<em class="underline">$2</em>$3'],

      // strike
      [/\^([\s\S]+?)\^/mg, (match, text) => {
        if (text.match(/^_+$/)) {
          return match
        }
        return `<em class='strike'>${text}</em>`
      }],

      // spoiler
      [/%%([\s\S]+?)%%/mg, '<em class="spoiler">$1</em>'],

      // line breaks
      [/\r?\n/mg,  "\n"],
      [/\n/mg,     "<br/>"],
      [/(<br\/>){2,}/mg, "<br/><br/>"],
    ]
  }

  render (content) {
    content = this.escapeHTML(content).trim()
    content = content.replace(URL_REGEXP, (match, text) => {
      if (match.includes('@') || !match.startsWith("http")) {
        return match
      }
      var link = match
      if (link.length > 50) {
        link = link.substring(0, 50) + "..."
      }
      link  = link.replace("&amp;", "&")
      match = match.replace("&amp;", "&")
      return `<a href='${match}' target='_parent' data-no-push='true'>${link}</a>`
    })

    for (let exp of this.expressions) {
      content = content.replace(exp[0], exp[1])
    }
    return content
  }

  escapeHTML (raw) {
    return String(raw.trim()).replace(/[&<>"']/g, (s) => {
      return this.entityMap[s]
    })
  }
}

window.Markup = new Markup
