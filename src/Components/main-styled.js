import styled from "styled-components";
import twitchLogo from "./twitch.png";

export const StreamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MainContainer = styled.div`
  margin-top: 16px;
`;

export const TwitchContainer = styled.div`
  position: relative;
  padding: 20px 16px 30px;
`;

export const Logo = styled.div`
  height: 200px;
  width: 100%;
  background: url("${twitchLogo}") no-repeat center;
  background-size: contain;
`;
