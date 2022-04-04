import { useState } from 'react'
import { Link } from 'react-router-dom'

import moment from 'moment'

// Helpers
import { ticketCommands } from '../../../commands'

// Components
import { Layout } from '../../../layout'
import { Button, Title } from '../../../components'

// Constants
import { Constant } from '../../../../common/constants'

// To code
const { DateFormat } = Constant.general

export function RemoveTicket() {
  // States
  const [date, setDate] = useState(new Date().toISOString())

  const handleChangeTime = async (date: string) => {
    setDate(date)
  }

  const handleSubmit = async () => {
    try {
      const formatDate = moment(date).format(DateFormat)
      const response = await ticketCommands.removeTicket(formatDate)
      console.info('Remove Ticket Command Response: ', response)
    } catch (error: any) {
      alert(`Error at Remove Ticket Command \n ${error.message}`)
    }
  }

  return (
    <Layout>
      <Title>Remove Ticket</Title>
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

        <Button onClick={handleSubmit}>Remove Ticket</Button>
      </div>
    </Layout>
  )
}
