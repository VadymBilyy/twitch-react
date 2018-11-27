import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import { mount } from "enzyme";
import mockStreams from "./mock";
import TwitchApp, { getStream } from "./Main.jsx";
import SearchComponent from "../Search/Search";

import "jest-enzyme";
const { configure } = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

configure({ adapter: new Adapter() });

jest.mock("../../Requests/getStreamsRequest", () =>
  jest.fn(() =>
    Promise.resolve({ status: 200, data: { streams: mockStreams } })
  )
);

describe("Main component tests", () => {
  // mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: {
      setItem: jest.fn(),
      getItem: jest.fn()
    }
  });

  test("Renders default TwitchApp", () => {
    const tree = renderer.create(<TwitchApp />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Renders TwitchApp with streams", async () => {
    const component = mount(<TwitchApp />);
    await component.instance().searchStreams(true, "", 10);
    expect(component.instance().state.availableStreams).toEqual(mockStreams);
  });

  test("Renders TwitchApp with streams", async () => {
    const component = mount(<TwitchApp />);
    component.instance().searchStreams = jest.fn();
    component.find(SearchComponent).find("button").at(0).simulate("click");
    expect(component.instance().searchStreams).toHaveBeenCalledWith(false, "", 10);
  });

  test("Select stream", async () => {
    const component = mount(<TwitchApp />);
    await component.instance().searchStreams(true, "", 10);
    component.instance().setStreamtToView(31415105808);
    expect(component.instance().state).toEqual({
      availableStreams: mockStreams,
      gameName: "",
      isFetching: false,
      isStreamShown: true,
      numResults: 10,
      selectedStream: 0,
      streamToViewId: 31415105808
    });
  });

  test("Update state", () => {
    const event = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      target: {
        value: "testValue"
      }
    };

    const component = mount(<TwitchApp />);

    component.instance().updateState(event, "numResults");
    expect(component.instance().state).toEqual({
      availableStreams: [],
      gameName: "",
      isFetching: true,
      isStreamShown: false,
      numResults: "testValue",
      selectedStream: 0,
      streamToViewId: ""
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });

    test("Back to view all available streams", async () => {
        const component = mount(<TwitchApp />);
        component.instance().setStreamtToView(31415105808);
        expect(component.instance().state.isStreamShown).toEqual(true);
        component.instance().onBackButtonClick();
        expect(component.instance().state.isStreamShown).toEqual(false);
    });

  test("Get selected stream", () => {
    expect(getStream(mockStreams, 31415105807)).toEqual(mockStreams[2]);
  });
});
