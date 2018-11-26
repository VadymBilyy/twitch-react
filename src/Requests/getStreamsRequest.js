// @flow
import axios from "axios";
import {get} from "lodash";

const apiKey = "2qvzq6agze7446rnr8nbbeujlr1j2z";

export default (isDefault = true, game = "", limit=10) => {
  const url = isDefault
    ? "https://api.twitch.tv/kraken/streams?first=10&limit=9"
    : `https://api.twitch.tv/kraken/streams?limit=${limit}&game=${game}`;
  return axios({
    method: "get",
    url,
    headers: {
      "client-id": apiKey
    }
  });
};
