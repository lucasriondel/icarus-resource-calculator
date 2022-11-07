import styled from "@emotion/styled";
import { devGothic } from "../assets/fonts";

export const Button = styled.button`
  padding: 0px 16px;
  font-family: ${devGothic.style.fontFamily};
  font-size: 1.25rem;

  border: 1px solid #a1a29d;
  color: #d2e4b2;
  background-color: #0e0e0e;

  &:hover {
    color: #0e0e0e;
    border: 1px solid #d2e4b2;
    background-color: #d2e4b2;
  }

  &:active {
    color: #d2e4b2;
    border: 1px solid #d2e4b2;
    background-color: #0e0e0e;
  }

  &:focus {
    color: #d2e4b2;
    border: 1px solid #d2e4b2;
    background-color: #0e0e0e;
  }
`;
