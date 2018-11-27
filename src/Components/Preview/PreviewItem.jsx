import React, { Component } from "react";
import { noop } from "lodash";

import { DescriptionContainer, PreviewContainer } from "./preview-styled";

export default class PreviewComponent extends Component<> {
  static defaultProps = {
    onPreviewClick: noop,
    streamName: "",
    streamThumbnail: "",
    imgUrl: ""
  };
  render() {
    return (
      <PreviewContainer
        onClick={() => this.props.onPreviewClick(this.props.id)}
        bgImage={this.props.imgUrl}
        data-qa-label={this.props.qaLabel}
      >
        <img src={this.props.imgUrl} alt="" />
        <DescriptionContainer>
          <span>
            Game: <strong>{this.props.streamName}</strong>
          </span>
          <span>
            Channel: <strong>{this.props.streamThumbnail}</strong>
          </span>
        </DescriptionContainer>
      </PreviewContainer>
    );
  }
}
