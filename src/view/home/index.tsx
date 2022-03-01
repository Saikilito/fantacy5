import { Link } from 'react-router-dom'

import { GlobalStyle } from '../../styles/GlobalStyle'
import { useClearStateHook } from '../../context'

// Components
import { Button, Container } from '../../components'
import { Image, Text } from './Home.style'

export function Home() {
  useClearStateHook()

  function handleSayHello() {
    window.Main.sendMessage('Hello World')
    console.log('Message sent! Check main process log in terminal.')
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Image
          src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
          alt="ReactJS logo"
        />
        <Text>Fantacy 5 - MB Software</Text>
        <Link to="/generate-ticket/selected-date">
          <Button onClick={handleSayHello}>Generate Ticket</Button>
        </Link>
        <Link to="/review-raffles">
          <Button onClick={handleSayHello}>Review Raffles</Button>
        </Link>
        <Link to="/review-ticket">
          <Button onClick={handleSayHello}>Review tickets</Button>
        </Link>
        <Link to="/commands">
          <Button onClick={handleSayHello}>Commands</Button>
        </Link>
      </Container>
    </>
  )
}
