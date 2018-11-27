import axios from "axios";

const apiKey = "2qvzq6agze7446rnr8nbbeujlr1j2z";

export default (isDefault = true, game = "", limit=10) => {
  const url = isDefault
    ? `https://api.twitch.tv/kraken/streams?first=10&limit=${limit}`
    : `https://api.twitch.tv/kraken/streams?limit=${limit}&game=${game}`;
  return axios({
    method: "get",
    url,
    headers: {
      "client-id": apiKey
    }
  });
};
