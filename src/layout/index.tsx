import React from 'react'
import { Link } from 'react-router-dom'

import { Constant } from '../../common/constants'

import { GlobalStyle } from '../styles/GlobalStyle'
import { ContainerGrand, LogoContainer, Logo } from '../components'

const { green: GreenColor } = Constant.colors

type LayoutType = {
  children: JSX.Element[] | JSX.Element
  withLogo?: boolean
  goToBack?: boolean
  maxSpace?: boolean
}

export const Layout: React.FC<LayoutType> = ({
  children,
  withLogo = true,
  goToBack = true,
  maxSpace = false,
}) => {
  return (
    <ContainerGrand width={maxSpace ? '650px' : null}>
      <GlobalStyle />

      {/** NavBar */}
      {goToBack && (
        <div
          style={{
            width: '100%',
            height: 50,
            position: 'fixed',
            top: 0,
            background: GreenColor,
            zIndex: 3,
          }}
        >
          <Link
            style={{
              fontWeight: 'bold',
              color: '#F2A232',
              display: 'block',
              margin: '0.8rem 3rem',
            }}
            to="/main_window"
          >
            ⏪ Go Back
          </Link>
        </div>
      )}

      {/** 'Logo' */}
      {withLogo && (
        <LogoContainer>
          <Logo />
        </LogoContainer>
      )}

      {/** Children */}
      {children}
    </ContainerGrand>
  )
}
