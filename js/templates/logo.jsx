import React from "react"

export default class Logo extends React.Component {
  render() {
    let content = <pre>
          <code>{`
  /$$$$$$            /$$                          
 /$$$_  $$          | $$                          
| $$$$\\ $$  /$$$$$$$| $$$$$$$   /$$$$$$  /$$$$$$$ 
| $$ $$ $$ /$$_____/| $$__  $$ |____  $$| $$__  $$
| $$\\ $$$$| $$      | $$  \\ $$  /$$$$$$$| $$  \\ $$
| $$ \\ $$$| $$      | $$  | $$ /$$__  $$| $$  | $$
|  $$$$$$/|  $$$$$$$| $$  | $$|  $$$$$$$| $$  | $$
 \\______/  \\_______/|__/  |__/ \\_______/|__/  |__/
          `}</code>      
    </pre>

    if (Nullchan.engineSettings.siteAddress != "0chan.bit") {
      content = <h1 className="third-party">{Nullchan.engineSettings.siteName}</h1>
    }

    return(<div id="logo">
      {content}
    </div>)
  }
}