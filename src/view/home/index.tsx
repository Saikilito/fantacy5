import { Link } from 'react-router-dom'

// Hocks
import { useClearStateHook } from '../../context'

// Components
import { Layout } from '../../layout'
import { Button, Title } from '../../components'

// To code
const randomButtonStyle = {
  width: '100%',
  margin: '32px auto',
}

export function Home() {
  useClearStateHook()

  function handleSayHello() {
    // window.Main.sendMessage('Hello World')
    // console.log('Message sent! Check main process log in terminal.')
  }

  return (
    <Layout goToBack={false}>
      <Title style={{ color: '#F2A232' }}>Fantasy 5 - MB Software</Title>
      <div
        style={{
          width: 370,
          padding: '5 12',
        }}
      >
        <Link style={{ width: '80%' }} to="/generate-ticket/selected-date">
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
      </div>
    </Layout>
  )
}
