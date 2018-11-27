import React, { PureComponent, Fragment } from "react";
import { get, find } from "lodash";
import {
  StreamsContainer,
  TwitchContainer,
  Footer,
  Credits,
  Logo
} from "./main-styled";
import PreviewItem from "../Preview/PreviewItem";
import SearchComponent from "../Search/Search";
import VideoComponent from "../Video/Video";
import getStreams from "../../Requests/getStreamsRequest";

export const renderStreams = (streams = [], callback) =>
  streams.map(stream => (
    <PreviewItem
      qaLabel={`${stream._id}`}
      key={stream._id}
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

    const numResults = localStorage.getItem("numResults") || 10;

    this.state = {
      isFetching: false,
      isStreamShown: false,
      gameName: "",
      numResults,
      streamToViewId: "",
      availableStreams: [],
      selectedStream: 0
    };
  }

  componentDidMount() {
    this.searchStreams(true, "", this.state.numResults);
  }

  onBackButtonClick = () => {
    this.setState({
      isStreamShown: false
    });
  };

  searchStreams = async (isDefault = true, game = "", limit) => {
    let streams = [];
    this.setState({
      isFetching: true,
      isStreamShown: false
    });
    try {
        streams = await getStreams(isDefault, game, limit);
        const availableStreams = get(streams, "data.streams");

        this.setState({
            availableStreams,
            isFetching: false
        });
    }
    catch(e) {
        this.setState({
            availableStreams: [],
            isFetching: false
        });
    }
  };

  setStreamtToView = streamToViewId => {
    this.setState({
      streamToViewId,
      isStreamShown: true
    });
  };

  updateState = (e, field) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = {};
    const newValue = get(e, "target.value");
    newState[field] = newValue;

    field === "numResults" && localStorage.setItem("numResults", newValue);

    this.setState({
      ...newState
    });
  };

  renderStreamPage = () => (
    <StreamsContainer>
      {this.state.isStreamShown
        ? this.renderStreamView()
        : renderStreams(this.state.availableStreams, this.setStreamtToView)}
    </StreamsContainer>
  );

  renderEmptyState = () => (
    <div>
      <h3>no streams to show</h3>
      <h4>try again or verify stream that you are looking</h4>
    </div>
  );

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

  renderSearchSection = () => (
    <SearchComponent
      onStartSearch={() => {
        this.searchStreams(false, this.state.gameName, this.state.numResults);
      }}
      updateState={this.updateState}
      numResults={this.state.numResults}
    />
  );

  renderVideoStream = () => {
    return this.state.availableStreams.length
      ? this.renderStreamPage()
      : this.renderEmptyState();
  };

  renderFooterSection = () => (
    <Footer>
      <Credits>special for Blip</Credits>
    </Footer>
  );

  render() {
    return (
      <Fragment>
        <Logo />
        <TwitchContainer isFetching={this.state.isFetching}>
          {this.renderSearchSection()}
          {this.renderVideoStream()}
        </TwitchContainer>
        {this.renderFooterSection()}
      </Fragment>
    );
  }
}
