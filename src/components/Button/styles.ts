import styled from 'styled-components'
import { Constant } from '../../../common/constants'

const { green: GreenColor } = Constant.colors

export const ButtonStyled = styled.button`
  height: 42px;
  padding: 0 24px;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${GreenColor};
  /* border-radius: 8px; */
  border: 0;

  color: #fff;
  font-size: 16px;
  font-weight: bold;

  cursor: pointer;

  margin: 1rem auto;

  :hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }

  :disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`
