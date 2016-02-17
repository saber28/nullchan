class Attachment extends React.Component {
  shortName() {
    var name = this.props.data.attachment
    if (name.length > 25) {
      var split = name.split(".")
      name = split.slice(0, split.length-1).join(".")
      name = name.slice(0, 23) + "..." + "." + split[split.length-1]
    }
    return name
  }

  render() {
    return(
      <div className="attachment">
        <div className="attachment-info">
          File: {Helpers.formatSizeUnits(this.props.data.attachment_size)},&nbsp;
          {this.props.data.attachment_full_width}x{this.props.data.attachment_full_height},&nbsp;
          <a href={this.props.data.attachment_full_path} 
            download={this.props.data.attachment} target="_blank">{this.shortName()}</a>
        </div>
        <a href={this.props.data.attachment_full_path} target="_blank">
          <img width={this.props.data.attachment_thumb_width} 
            height={this.props.data.attachment_thumb_height} 
            src={this.props.data.attachment_thumb_path} />
        </a>
      </div>
    )
  }
}

class AttachmentOld extends React.Component {
  render() {
    return(
      <div className="attachment">
        <a href={this.props.urlFull} target="_blank">
          <img src={this.props.urlThumb} />
        </a>
      </div>
    )
  }
}
