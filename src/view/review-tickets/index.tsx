import { Link } from 'react-router-dom'

// Helpers
import { useClearStateHook } from '../../context'

// Components
import { Layout } from '../../layout'
import { Button } from '../../components'

// To code
const randomButtonStyle = {
  width: '100%',
}

export function ReviewTicket() {
  useClearStateHook()

  return (
    <Layout>
      <Link style={randomButtonStyle} to="/get-ticket">
        <Button>Get Ticket</Button>
      </Link>
      <Link style={randomButtonStyle} to="/remove-ticket">
        <Button>Remove Ticket</Button>
      </Link>
    </Layout>
  )
}

export * from './get-ticket'
export * from './remove-ticket'
