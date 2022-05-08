import { useState } from 'react'

import moment from 'moment'

// Helpers
import { raffleCommands } from '../../../commands'

// Components
import { SmallContainer, Button } from '../../../components'
import { Layout } from '../../../layout'

// Constants
import { Constant } from '../../../../common/constants'

// To code
const { DateFormat } = Constant.general

export function RemoveRaffle() {
  // States
  const [date, setDate] = useState(new Date().toISOString())

  const handleChangeTime = async (date: string) => {
    setDate(date)
  }

  const handleSubmit = async () => {
    try {
      const formatDate = moment(date).format(DateFormat)
      const response = await raffleCommands.removeRaffle(formatDate)
      console.info('Remove Raffle Command Response: ', response)
    } catch (error: any) {
      alert(`Error at Remove Raffle Command \n ${error.message}`)
    }
  }

  return (
    <Layout>
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
            style={{ alignSelf: 'center', width: '100%' }}
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
    </Layout>
  )
}
