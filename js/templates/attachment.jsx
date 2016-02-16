class Attachment extends React.Component {
  render() {
    return(
      <div className="attachment">
        <div className="attachment-info">
          File: {Helpers.formatSizeUnits(this.props.data.attachment_size)},&nbsp;
          {this.props.data.attachment_full_width}x{this.props.data.attachment_full_height}&nbsp;&nbsp;
          <a href={this.props.data.attachment_full_path} 
            download={this.props.data.attachment} target="_blank">{this.props.data.attachment}</a>
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
