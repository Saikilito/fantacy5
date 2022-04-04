import { Link } from 'react-router-dom'

// Helpers
import { useClearStateHook } from '../../context'

// Components
import { Layout } from '../../layout'
import { Button, Container } from '../../components'

// To code
const randomButtonStyle = {}

export function ReviewRaffle() {
  useClearStateHook()

  return (
    <Layout>
      <Link style={{ width: '80%' }} to="/add-new-raffle">
        <Button style={randomButtonStyle}>Add New Raffle</Button>
      </Link>
      <Link style={{ width: '80%' }} to="/get-raffle">
        <Button style={randomButtonStyle}>Get Raffle</Button>
      </Link>
      <Link style={{ width: '80%' }} to="/remove-raffle">
        <Button style={randomButtonStyle}>Remove Raffle</Button>
      </Link>
    </Layout>
  )
}

export * from './add-new-raffle'
export * from './remove-raffle'
export * from './get-raffles'
