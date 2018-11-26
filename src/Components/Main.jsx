// @flow
import React, { PureComponent, Fragment } from "react";
import { get, find } from "lodash";
import {
  StreamsContainer,
  MainContainer,
  TwitchContainer,
  Logo
} from "./main-styled";
import PreviewItem from "./PreviewItem";
import SearchComponent from "./Search";
import VideoComponent from "./Video";
import getStreams from "../Requests/getStreamsRequest";

export const renderStreams = (streams = [], callback) =>
  streams.map(stream => (
    <PreviewItem
      onPreviewClick={callback}
      streamName={stream.game}
      streamThumbnail={stream.channel.name}
      id={stream._id}
      imgUrl={stream.preview.medium}
    />
  ));

export const getStream = (streams, id) =>
  find(streams, stream => id === stream._id);

export default class TwitchApp extends PureComponent<> {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      isStreamShown: false,
      gameName: "",
      numResults: 10,
      streamToView: "",
      availableStreams: [],
      selectedStream: 0
    };
  }

  componentDidMount() {
    // read number of results from localStorage and set it to state
    // fetch 10 default streams
    this.searchStreams();
  }

  onBackButtonClick = () => {
    this.setState({
      isStreamShown: false
    });
  };

  searchStreams = async (isDefault = true, game = "", limit) => {
    const streams = await getStreams(isDefault, game, limit);
    const availableStreams = get(streams, "data.streams");
    console.log(availableStreams);

    this.setState({
      availableStreams
    });
  };

  setStreamtToView = streamToViewId => {
    this.setState({
      streamToViewId,
      isStreamShown: true
    });
  };

  onSearchChange = e => {
    e.preventDefault();
    e.stopPropagation();

    const gameName = e.target.value;

    this.setState({
      gameName
    });
  };

  changeResultsNumber = e => {
    e.preventDefault();
    e.stopPropagation();
    const numResults = e.target.value;

    this.setState({
      numResults
    });
  };

  renderStreamPage = () =>
    this.state.isStreamShown ? (
      this.renderStreamView()
    ) : (
      <StreamsContainer>
        {renderStreams(this.state.availableStreams, this.setStreamtToView)}
      </StreamsContainer>
    );

  renderEmptyState = () => {};

  renderStreamView = () => {
    const streamToShow = getStream(
      this.state.availableStreams,
      this.state.streamToViewId
    );

    const stream = {
      url: streamToShow.channel.url,
      game: streamToShow.game,
      status: streamToShow.channel.status,
      streamSrc: streamToShow.channel.name,
      viewers: streamToShow.viewers
    };

    return <VideoComponent stream={stream} onBack={this.onBackButtonClick} />;
  };

  render() {
    return (
      <TwitchContainer>
        <Logo />
        <SearchComponent
          onStartSearch={() =>
            this.searchStreams(
              false,
              this.state.gameName,
              this.state.numResults
            )
          }
          onNumResultsChange={this.changeResultsNumber}
          numResults={this.state.numResults}
          onSearchChange={this.onSearchChange}
        />
        <MainContainer>
          {this.state.availableStreams.length
            ? this.renderStreamPage()
            : this.renderEmptyState()}
        </MainContainer>
      </TwitchContainer>
    );
  }
}
