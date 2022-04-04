import styled from 'styled-components'
import { Constant } from '../../../common/constants'

const { orange: OrangeColor } = Constant.colors

export const Text = styled.p`
  margin-top: 24px;
  font-size: 18px;
`
export const Title = styled.h1`
  margin: 24px;
  font-size: 2rem;
  text-align: center;
  color: ${OrangeColor};
`

export const Subtitle = styled.h3`
  margin: 24px;
  font-size: 1.6rem;
  text-align: center;
`
