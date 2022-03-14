import { useState } from 'react'
import { Link } from 'react-router-dom'

// Helpers
import { raffleCommands } from '../../../commands'

// Components
import { SmallContainer, Button } from '../../../components'

// To code
export function RemoveRaffle() {
  // States
  const [date, setDate] = useState(new Date().toISOString())

  const handleChangeTime = async (date: string) => {
    setDate(date)
  }

  const handleSubmit = async () => {
    try {
      const response = await raffleCommands.removeRaffle(date)
      console.info('Remove Raffle Command Response: ', response)
    } catch (error: any) {
      alert(`Error at Remove Raffle Command \n ${error.message}`)
    }
  }

  return (
    <>
      <Link to="/main_window"> ⏪ Go Back</Link>
      <SmallContainer>
        <h1 style={{ textAlign: 'center' }}>Remove Raffle</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <input
            type="date"
            value={date}
            style={{ alignSelf: 'center', width: '18%' }}
            onChange={date => handleChangeTime(date.target.value)}
          />

          <Button
            onClick={handleSubmit}
            style={{ width: 335, margin: '5px 0', alignSelf: 'center' }}
          >
            Remove Raffle
          </Button>
        </div>
      </SmallContainer>
    </>
  )
}
