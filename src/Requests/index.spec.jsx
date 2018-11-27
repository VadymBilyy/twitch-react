import "jest-styled-components";
import axios from "axios";
import streamsRequest from "./getStreamsRequest";

import "jest-enzyme";
const { configure } = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

configure({ adapter: new Adapter() });

jest.mock("axios", () => jest.fn());

describe("Request streams tests", () => {
  test("Default request", () => {
    streamsRequest();
    expect(axios).toHaveBeenCalledWith({
      headers: { "client-id": "2qvzq6agze7446rnr8nbbeujlr1j2z" },
      method: "get",
      url: "https://api.twitch.tv/kraken/streams?first=10&limit=10"
    });
  });

  test("Request for channel", () => {
    streamsRequest(false, "doom", 7);
    expect(axios).toHaveBeenCalledWith({
      headers: { "client-id": "2qvzq6agze7446rnr8nbbeujlr1j2z" },
      method: "get",
      url: "https://api.twitch.tv/kraken/streams?limit=7&game=doom"
    });
  });
});
