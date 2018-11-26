import styled from "styled-components";

export const DescriptionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

export const PreviewContainer = styled.button`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 16px 16px 0;
  border-radius: 2px;
  background-image: ${props => `url(${props.imgUrl})`};
  align-items: center;
  justify-content: center;
  outline: none;
  box-shadow: 2px 2px 2px 2px #64528f;
  transition: box-shadow 0.3s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 3px 3px 6px 7px #64528f;
  }

  & img {
    width: 100%;
  }
`;
