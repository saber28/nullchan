class Helpers {
  static formatSizeUnits (bytes) {
    if      (bytes>=1000000000) { bytes=(bytes/1000000000).toFixed(2)+' GB' }
    else if (bytes>=1000000)    { bytes=(bytes/1000000).toFixed(2)+' MB'    }
    else if (bytes>=1000)       { bytes=(bytes/1000).toFixed(2)+' KB'       }
    else if (bytes>1)           { bytes=bytes+' bytes'                      }
    else if (bytes==1)          { bytes=bytes+' byte'                       }
    else                        { bytes='0 byte'                            }
    return bytes
  }

  static timeSince (time) {
    var now, secs, back

    now  = +(new Date) / 1000
    secs = now - time

    if (secs < 60) {
      back = "just now"
    } else if (secs < 60 * 60) {
      back = (Math.round(secs / 60)) + " minutes ago"
    } else if (secs < 60 * 60 * 24) {
      back = (Math.round(secs / 60 / 60)) + " hours ago"
    } else if (secs < 60 * 60 * 24 * 3) {
      back = (Math.round(secs / 60 / 60 / 24)) + " days ago"
    } else {
      back = "on " + this.formatDate(time)
    }
    back = back.replace(/^1 ([a-z]+)s/, "1 $1")
    return back
  }

  static formatDate (timestamp, format = "short") {
    var parts, display
    parts = (new Date(timestamp*1000)).toString().split(" ")

    if (format == "short") {
      display = parts.slice(1, 4)
    } else {
      display = parts.slice(1, 5)
    }
    return display.join(" ").replace(/( [0-9]{4})/, ",$1")
  }

  static unixTimestamp (date = "now") {
    if (date == "now") {
      return parseInt(+(new Date)/1000)
    } else {
      parseInt(Date.parse(date)/1000)
    }
  }

  static fixLink (href) {
    if (document.location.pathname != "/") {
      return href
    }
    return "/" + href
  }
}

export default Helpers
