import React, { Component, Fragment } from "react";
import { noop } from "lodash";

import {
  SearchContainer,
  SearchInput,
  SearchButton,
  ResultNumContainer,
  ResultsNumInput,
  ResNum
} from "./search-styled";

export default class SearchComponent extends Component<> {
  static defaultProps = {
    onSearchChange: noop,
    onStartSearch: noop,
    onNumResultsChange: noop,
    numResults: 10
  };

  enterKeyHandler = e => {
    if (e.charCode === 13) {
      this.props.onStartSearch();
    }
  };

  render() {
    return (
      <Fragment>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="find your channel..."
            onChange={e => this.props.updateState(e, "gameName")}
            onKeyPress={this.enterKeyHandler}
          />
          <SearchButton onClick={this.props.onStartSearch}>Search</SearchButton>
        </SearchContainer>
        <ResultNumContainer>
          <ResNum>Number of results: </ResNum>
          <ResultsNumInput
            type="number"
            value={this.props.numResults}
            onChange={e => this.props.updateState(e, "numResults")}
          />
        </ResultNumContainer>
      </Fragment>
    );
  }
}
