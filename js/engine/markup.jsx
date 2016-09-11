import Helpers    from "../libs/helpers.jsx"

const URL_REGEXP = /[-a-zA-Z0-9@:%_\+.~#?&amp;\/\/=]{2,256}\.?[a-z]{2,4}\b([\/:][-a-zA-Z0-9@:%_\+.~#?&amp;\/\/=!]*){1,}/mg

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
        let post = Threads.shortMap[content]
        if (!!!post) {
          return match
        }

        let fakeID = Threads.hashToNum[post.hashsum]
        let parent = post.parent || post.hashsum
        let url    = Helpers.fixLink(`/${Nullchan.engineSettings.siteAddress}/?/${post.board}/thread/${parent}/${content}`)
        return `<a class="reflink" href="${url}">&gt;&gt;${fakeID}</a>`
      }],

      // quote
      [/^\s*&gt;\s{0,1}(.+?)$/mg, (match, content) => {
        let br = ""
        if (match[0] == "\n") {
          br = "<hr/>"
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
      [/\n/mg,     "<hr/>"],
      [/(<hr\/>){2,}/mg, "<hr/><hr/>"],
    ]
  }

  render (content) {
    content = this.escapeHTML(content).trim()
    content = content.replace(URL_REGEXP, (match, text) => {
      if (!!match.match('@') || !(match.startsWith("http") || match.startsWith("magnet"))) {
        return match
      }
      let link = match
      if (link.length > 100) {
        link = link.substring(0, 100) + "..."
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
window.Markup = new Markup()
