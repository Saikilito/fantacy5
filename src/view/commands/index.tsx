import { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Constant } from '../../../common/constants'
import { GlobalStyle } from '../../styles/GlobalStyle'
import { Container, Button } from '../../components'
import { Text } from '../home/Home.style'
import { raffleCommands } from '../../commands'

export * from './CreateRaffle'
export * from './GetRaffles'

const { DateFormat } = Constant.general

export function Commands() {
  const [drawingNumbers, setDrawingNumbers] = useState('')
  const [date, setDate] = useState(new Date().toISOString())
  const [endDate, setEndDate] = useState(new Date().toISOString())

  const handleChange = (event: any) => {
    const value = event.target.value.replace(/\+|-/gi, '')
    setDrawingNumbers(value)
  }
  const handleChangeDate = (event: any) => {
    const value = event.target.value
    setDate(value)
  }
  const handleChangeDateEnd = (event: any) => {
    const value = event.target.value
    setEndDate(value)
  }

  const handleGetOneRaffle = (type: string) => {
    let data = drawingNumbers
    if (type === 'date') {
      data = moment(drawingNumbers).format(DateFormat)
    }

    raffleCommands.getOne(type, data)
    setDrawingNumbers('')
  }
  const handleGetByDate = () => {
    const date = moment(drawingNumbers).format(DateFormat)

    raffleCommands.getByDate(date)
    setDrawingNumbers('')
  }
  const handleGetByRange = () => {
    const data = {
      startDate: moment(date).format(DateFormat),
      endDate: moment(endDate).format(DateFormat),
    }

    raffleCommands.getByRange(data)
    setDrawingNumbers('')
  }
  return (
    <>
      <GlobalStyle />
      <Link to="/main_window"> Back</Link>
      <Container>
        <div style={{ display: 'flex' }}>
          <form>
            <input style={{ maxWidth: 40 }} type="number" />
            <input style={{ maxWidth: 40 }} type="number" />
            <input style={{ maxWidth: 40 }} type="number" />
            <input style={{ maxWidth: 40 }} type="number" />
            <input style={{ maxWidth: 40 }} type="number" />
          </form>
        </div>

        <Text> Input</Text>
        {/*
          // TODO: Limit the max number
        */}

        <Text style={{ textAlign: 'center' }}> Raffles Commands</Text>
        <input onInput={e => handleChange(e)} value={drawingNumbers} />
        <br />
        <input type="date" onInput={e => handleChangeDate(e)} value={date} />
        <br />
        <input
          type="date"
          onInput={e => handleChangeDateEnd(e)}
          value={endDate}
        />

        <Button onClick={() => raffleCommands.getAll()}>Get All</Button>
        <Link to="create-raffle">
          <Button>Create/Delete Raffle</Button>
        </Link>
        <Link to="create-raffle">
          <Button onClick={() => handleGetOneRaffle('id')}>Get Raffles</Button>
        </Link>
        <Button onClick={() => handleGetOneRaffle('date')}>
          Get One By Date
        </Button>
        <Button onClick={handleGetByDate}>Get By Date</Button>
        <Button onClick={() => handleGetByRange()}>Get By Range</Button>
      </Container>
    </>
  )
}
