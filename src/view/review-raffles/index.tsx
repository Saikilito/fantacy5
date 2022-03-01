import { Link } from 'react-router-dom'

// Components
import { Button, Container } from '../../components'

export default function ReviewRaffle() {
  return (
    <Container>
      <Link to="">
        <Button>Add New Raffle</Button>
      </Link>
      <Link to="">
        <Button>Get By Range</Button>
      </Link>
      <Link to="">
        <Button>Remove Raffle</Button>
      </Link>
    </Container>
  )
}
