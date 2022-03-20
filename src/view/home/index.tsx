import { Link } from 'react-router-dom'

import { GlobalStyle } from '../../styles/GlobalStyle'
import { useClearStateHook } from '../../context'

// Components
import { Button, Container, Image } from '../../components'
import { Text } from './Home.style'

// To code
const randomButtonStyle = {
  width: 200,
}

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
          <Button style={randomButtonStyle} onClick={handleSayHello}>
            Generate Ticket
          </Button>
        </Link>
        <Link to="/review-raffles">
          <Button style={randomButtonStyle} onClick={handleSayHello}>
            Review Raffles
          </Button>
        </Link>
        <Link to="/review-ticket">
          <Button style={randomButtonStyle} onClick={handleSayHello}>
            Review tickets
          </Button>
        </Link>
      </Container>
    </>
  )
}
