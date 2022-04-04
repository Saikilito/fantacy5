import { createGlobalStyle } from 'styled-components'
import { Constant } from '../../common/constants'

const { red: RedColor } = Constant.colors

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6; 
    background: ${RedColor};
  }
`
