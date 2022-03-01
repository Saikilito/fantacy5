import { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { raffleCommands } from '../../commands'
import { Constant } from '../../../common/constants'

// Components
import { Text } from '../home/Home.style'
import { Button, Container } from '../../components'

const { DateFormat } = Constant.general

export const CreateRaffle = () => {
  const [drawingNumbers, setDrawingNumbers] = useState('')
  const [date, setDate] = useState(new Date().toISOString())

  const handleChangeDate = (event: any) => {
    const value = event.target.value
    setDate(value)
  }

  const handleCreateRaffle = () => {
    const numbers = drawingNumbers.split('/')?.filter(Boolean)

    const noRepeatNumbers = new Set()
    numbers.map(n => noRepeatNumbers.add(n))
    if (noRepeatNumbers.size !== 5) {
      return alert('Should insert almost five (5) numbers')
    }
    console.info(date)
    const formatDate = moment(date).format(DateFormat)
    raffleCommands.create(numbers, formatDate)
    setDrawingNumbers('')
  }

  const handleChange = (event: any) => {
    const value = event.target.value.replace(/\+|-/gi, '')
    setDrawingNumbers(value)
  }

  return (
    <>
      <Link style={{ fontWeight: 'bold' }} to="/main_window">
        Back
      </Link>
      <Container>
        <h1 style={{ marginTop: '-12rem' }}>Create Raffle</h1>
        <Text>Insert Date for numbers</Text>
        <input type="date" value={date} onInput={e => handleChangeDate(e)} />
        <Text>Insert Number, Split With "/" Character</Text>
        <input onInput={e => handleChange(e)} value={drawingNumbers} />
        <Button onClick={handleCreateRaffle}>Create/Delete Raffle</Button>
      </Container>
    </>
  )
}
