import { useState } from 'react'
import { Link } from 'react-router-dom'

import moment from 'moment'

// Helpers
import { raffleCommands } from '../../../commands'

// Constants
import { Constant } from '../../../../common/constants'

// Components
import { Layout } from '../../../layout'
import { SmallContainer, Button, Title } from '../../../components'

// To code
const { DateFormat } = Constant.general
const { orange: OrangeColor } = Constant.colors

const randomStyles = {
  fontWeight: 'bold',
  height: 40,
  width: '100%',
  textAlign: 'center',
  margin: '15px 0',
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
    <Layout>
      <Title>Get Raffle</Title>
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
          style={{ alignSelf: 'center', width: '100%' }}
          onChange={date => handleChangeTime(date.target.value)}
        />

        <Button onClick={handleSubmit}>Get Raffle</Button>
      </div>

      <h2 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>
        Raffle found:
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {raffles?.length ? (
          raffles?.map((raffle, index) => (
            <p
              key={index}
              style={{
                ...randomStyles,
                margin: '15px 2px',
                background: OrangeColor,
              }}
            >
              {raffle}
            </p>
          ))
        ) : (
          <p style={{ ...randomStyles, padding: 10 }}>Raffle not found</p>
        )}
      </div>
    </Layout>
  )
}
