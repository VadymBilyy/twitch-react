import React, { Component } from "react";
import { noop } from "lodash";

import {
  VideoContainer,
  VideoComponent,
  BackButton,
  DetailsContainer,
  DescriptionContainer
} from "./video-styled";

export default class StreamComponent extends Component<> {
  static defaultProps = {
    stream: {
      game: "",
      url: "",
      status: "",
      viewers: 0
    },
    onBack: noop
  };
  render() {
    return (
      <VideoContainer>
        <BackButton onClick={this.props.onBack}> Back to list</BackButton>
        <VideoComponent
          src={`https://player.twitch.tv/?channel=${
            this.props.stream.streamSrc
          }`}
          height="500"
          width="100%"
          frameBorder="0"
          allowFullScreen
        />
        <DetailsContainer>
          <DescriptionContainer>
            <span>Game: <strong>{this.props.stream.game}</strong></span>
            <span>Viewers: <strong>{this.props.stream.viewers}</strong></span>
            <span>Status: <strong>{this.props.stream.status}</strong></span>
            <span>Follow here: <strong>{this.props.stream.url}</strong></span>
          </DescriptionContainer>
        </DetailsContainer>
      </VideoContainer>
    );
  }
}
