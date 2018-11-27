import React from "react";
import "jest-styled-components";
import { mount } from "enzyme";
import PreviewComponent from "./PreviewItem";

import "jest-enzyme";
const { configure } = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

configure({ adapter: new Adapter() });

describe("Preview component tests", () => {
  test("Select video to show", () => {
    const onPreviewClick = jest.fn();
    const component = mount(
      <PreviewComponent id={12345} onPreviewClick={onPreviewClick} />
    );

    component
      .find("button")
      .at(0)
      .simulate("click");

    expect(onPreviewClick).toHaveBeenCalledWith(12345);
  });
});
