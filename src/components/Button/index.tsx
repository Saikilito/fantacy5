import { ReactNode, ButtonHTMLAttributes } from 'react'

import { ButtonStyled } from './styles'

type ButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return <ButtonStyled type="button" {...props} />
}
