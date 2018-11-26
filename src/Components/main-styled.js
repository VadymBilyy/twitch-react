import styled from "styled-components";
import twitchLogo from "./twitch.png";

export const StreamsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Footer = styled.footer`
  height: 50px;
  background-color: #64528f;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding-right: 20px;
`;

export const Credits = styled.span`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
`;

export const TwitchContainer = styled.div`
  position: relative;
  padding: 20px 16px 30px;

  & h3,
  & h4 {
    text-transform: uppercase;
    color: red;
    text-align: center;
  }
`;

export const Logo = styled.div`
  height: 200px;
  width: 100%;
  background: url("${twitchLogo}") no-repeat center;
  background-size: contain;
`;
