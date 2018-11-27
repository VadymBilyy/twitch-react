import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import { mount } from "enzyme";
import SearchComponent from "./Search.jsx";

import "jest-enzyme";
const { configure } = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

configure({ adapter: new Adapter() });

describe("Search component tests", () => {
  test("Renders default SearchComponent", () => {
    const tree = renderer.create(<SearchComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Enter key is pressed", () => {
    const onStartSearch = jest.fn();
    const event = {
      charCode: 13
    };
    const component = mount(<SearchComponent onStartSearch={onStartSearch} />);
    component.instance().enterKeyHandler(event);
    expect(onStartSearch).toHaveBeenCalled();
  });

  test("NON - Enter key is pressed", () => {
    const onStartSearch = jest.fn();
    const event = {
      charCode: 14
    };
    const component = mount(<SearchComponent onStartSearch={onStartSearch} />);
    component.instance().enterKeyHandler(event);
    expect(onStartSearch).not.toHaveBeenCalled();
  });

  test("Change value of search input", () => {
    const updateStateFn = jest.fn();
    const event = { target: { value: "testGame" } };
    const component = mount(<SearchComponent updateState={updateStateFn} />);

    component
      .find("input")
      .first()
      .simulate("change", event);

    expect(updateStateFn).toHaveBeenCalled();
  });

  test("Change value of number of results input", () => {
    const updateStateFn = jest.fn();
    const event = { target: { value: 2 } };
    const component = mount(<SearchComponent updateState={updateStateFn} />);

    component
      .find("input")
      .at(1)
      .simulate("change", event);

    expect(updateStateFn).toHaveBeenCalled();
  });
});
