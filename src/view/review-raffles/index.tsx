import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Helpers
import { useClearStateHook } from '../../context'

// Components
import { Button, Container } from '../../components'

// To code
const randomButtonStyle = {
  width: 200,
}

export function ReviewRaffle() {
  useClearStateHook()

  return (
    <Container>
      {/* <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
        style={{ margin: '10px 0' }}
      /> */}

      <Link to="/add-new-raffle">
        <Button style={randomButtonStyle}>Add New Raffle</Button>
      </Link>
      <Link to="/get-raffle">
        <Button style={randomButtonStyle}>Get Raffle</Button>
      </Link>
      <Link to="/remove-raffle">
        <Button style={randomButtonStyle}>Remove Raffle</Button>
      </Link>
    </Container>
  )
}

export * from './add-new-raffle'
export * from './remove-raffle'
export * from './get-raffles'
