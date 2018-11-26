// @flow
import React, { Component } from "react";
import { noop } from "lodash";

import { DescriptionContainer, PreviewContainer } from "./preview-styled";

type Props = {

};

export default class PreviewComponent extends Component<Props> {
    static defaultProps = {
        onPreviewClick: noop,
        streamName: noop,
        streamThumbnail: noop,
        imgUrl: "",
    };
    render() {
        return (
            <PreviewContainer onClick={ () => this.props.onPreviewClick(this.props.id)} bgImage={this.props.imgUrl}>
                <img src={this.props.imgUrl} alt=""/>
                <DescriptionContainer>
                    <span>Game: <strong>{this.props.streamName}</strong></span>
                    <span>Channel: <strong>{this.props.streamThumbnail}</strong></span>
                </DescriptionContainer>
            </PreviewContainer>
        );
    }
}