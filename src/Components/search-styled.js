import styled from "styled-components";
import {mainThemeColor} from "./main-styled";

export const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const ResultNumContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SearchInput = styled.input`
  height: 40px;
  width: 100%;
  font-size: 12px;
  border-radius: 2px;
  text-indent: 8px;
  box-sizing: border-box;
  background-color: white;
  margin-right: 16px;
  appearance: none;
  border: 1px solid ${mainThemeColor};

  &:active,
  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  height: 40px;
  font-size: 12px;
  background-color: ${mainThemeColor};
  text-transform: uppercase;
  display: inline-block;
  color: white;
  font-weight: bold;
  border-radius: 2px;
  outline: none;
`;

export const ResultsNumInput = styled(SearchInput)`
  width: 50px;
  text-align: center;
  height: 20px;
  margin-right: 0;
`;

export const ResNum = styled.span`
  margin-right: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${mainThemeColor};
`;
