import { ReactNode } from 'react'

import {
  ContainerStyled,
  ContainerGrandStyled,
  SmallContainerStyled,
} from './styles'

type ContainerProps = {
  children: ReactNode
}

type ContainerGrandType = {
  children: ReactNode
  width: string
}

export function ContainerGrand(props: ContainerGrandType) {
  return <ContainerGrandStyled {...props} />
}

export function Container(props: ContainerProps) {
  return <ContainerStyled {...props} />
}

export const SmallContainer = (props: ContainerProps) => {
  return <SmallContainerStyled {...props} />
}
