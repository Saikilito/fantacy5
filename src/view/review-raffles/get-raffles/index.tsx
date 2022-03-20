import { useState } from 'react'
import { Link } from 'react-router-dom'

import moment from 'moment'

// Helpers
import { raffleCommands } from '../../../commands'

// Constants
import { Constant } from '../../../../common/constants'

// Components
import { SmallContainer, Button } from '../../../components'

// To code
const { DateFormat } = Constant.general

const randomStyles = {
  fontWeight: 'bold',
  height: '18px',
  width: '20px',
  textAlign: 'center',
  margin: '10px 15px',
  padding: '10px 5px',
  borderRadius: '0.3rem',
  background: '#3498db',
} as any

export function GetRaffle() {
  // States
  const [date, setDate] = useState(new Date().toISOString())
  const [raffles, setRaffles] = useState([])

  const handleChangeTime = async (date: string) => {
    setDate(date)
  }

  const handleSubmit = async () => {
    try {
      const formatDate = moment(date).format(DateFormat)
      const response = await raffleCommands.getByDate(formatDate)
      console.info(response.data)
      const [raffle] = response.data
      setRaffles(raffle?.drawingNumbers)
      console.info('Get Raffle Command Response: ', response)
    } catch (error: any) {
      alert(`Error at Get Raffle Command \n ${error.message}`)
    }
  }

  return (
    <>
      <Link to="/main_window"> ⏪ Go Back</Link>
      <SmallContainer>
        <h1 style={{ textAlign: 'center' }}>Get Raffle</h1>
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
            Get Raffle
          </Button>
        </div>
      </SmallContainer>
      <SmallContainer>
        <h2 style={{ textAlign: 'center' }}>Raffle found:</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {raffles?.length ? (
            raffles?.map(raffle => <p style={randomStyles}>{raffle}</p>)
          ) : (
            <p style={{ ...randomStyles, width: 300, padding: 10 }}>
              Raffle not found
            </p>
          )}
        </div>
      </SmallContainer>
    </>
  )
}
