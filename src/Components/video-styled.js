import styled from "styled-components";

export const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const VideoComponent = styled.iframe`
  margin-top: 16px;
`;

export const BackButton = styled.button`
  height: 40px;
  font-size: 12px;
  display: inline-block;
  background-color: #64528f;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
`;

export const DetailsContainer = styled.div``;

export const DescriptionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-end;

  & span {
    margin-bottom: 8px;
  }
`;
