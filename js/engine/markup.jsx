class Markup {
  constructor () {
    this.entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;',
    }

    this.expressions = [
      // quote
      [/^\s*&gt;\s{0,1}(.+?)$/mg, ((match, content) => {
        let br = ""
        if (match[0] == "\n") {
          br = "<br />"
        }
        return (br + `<em class='quote'>&gt; ${content}</em>`)
      })],

      // bold
      [/\*\*([\s\S]+?)\*\*/mg, '<em class="bold">$1</em>'],

      // italic
      [/\*([\s\S]+?)\*/mg, '<em class="italic">$1</em>'],

      // underline
      [/(^|\s|\A)__([\s\S]+?)__(\s|\z|$)/mg, '$1<em class="underline">$2</em>$3'],

      // strike
      [/\^([\s\S]+?)\^/mg, ((match, text) => {
        if (text.match(/^_+$/)) {
          return match
        }
        return `<em class='strike'>${text}</em>`
      })],

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
    for (let exp of this.expressions) {
      content = content.replace(exp[0], exp[1])
    }
    return content
  }

  escapeHTML (raw) {
    return String(raw.trim()).replace(/[&<>"'\/]/g, (s) => {
      return this.entityMap[s]
    })
  }
}

window.Markup = new Markup
