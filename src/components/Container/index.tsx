import { ReactNode } from 'react'

import { ContainerStyled } from './styles'

type ContainerProps = {
  children: ReactNode
}

export function Container(props: ContainerProps) {
  return <ContainerStyled {...props} />
}
