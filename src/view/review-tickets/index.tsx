import { Link } from 'react-router-dom'

// Helpers
import { useClearStateHook } from '../../context'

// Components
import { Button, Container } from '../../components'

// To code
const randomButtonStyle = {
  width: 200,
}

export function ReviewTicket() {
  useClearStateHook()

  return (
    <Container>
      {/* <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
        style={{ margin: '10px 0' }}
      /> */}

      <Link to="/get-ticket">
        <Button style={randomButtonStyle}>Get Ticket</Button>
      </Link>
      <Link to="/remove-ticket">
        <Button style={randomButtonStyle}>Remove Ticket</Button>
      </Link>
    </Container>
  )
}

export * from './get-ticket'
export * from './remove-ticket'
