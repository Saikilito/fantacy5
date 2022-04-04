import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LogoContainer = styled.div`
  width: 200px;
  animation: ${rotate} 15s linear infinite;
`
