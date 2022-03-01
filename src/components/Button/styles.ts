import styled from 'styled-components'

export const ButtonStyled = styled.button`
  height: 42px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #8257e6;
  border-radius: 8px;
  border: 0;

  color: #fff;
  font-size: 16px;
  font-weight: bold;

  cursor: pointer;

  margin: 1rem 0.5rem;

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
