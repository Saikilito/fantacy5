import { useState, ChangeEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import moment from 'moment'

// Helpers
import { getArrayWithUniqueNumbersAndOrder } from '../../../helpers'
import { raffleCommands } from '../../../commands'

// Constants
import { Constant } from '../../../../common/constants'

// Components
import { SmallContainer, Button } from '../../../components'
import { NumberInput } from './add-new-raffle.styled'

// To code
const { DateFormat } = Constant.general
const newArraySpace = Array.from(new Array(5))

type objectInputHandlersType = {
  [x: number]: Function
}

export function AddNewRaffle() {
  // Global State
  const history = useHistory()

  // States
  const [date, setDate] = useState(new Date().toISOString())

  const [input0, setInputNumber0] = useState(null)
  const [input1, setInputNumber1] = useState(null)
  const [input2, setInputNumber2] = useState(null)
  const [input3, setInputNumber3] = useState(null)
  const [input4, setInputNumber4] = useState(null)

  const objectInputHandlers = {
    0: setInputNumber0,
    1: setInputNumber1,
    2: setInputNumber2,
    3: setInputNumber3,
    4: setInputNumber4,
  } as objectInputHandlersType

  const handleChangeTime = async (date: string) => {
    setDate(date)
  }

  const handleSubmit = async () => {
    const newRaffleNumbersDirty: string[] = [
      input0 ?? '',
      input1 ?? '',
      input2 ?? '',
      input3 ?? '',
      input4 ?? '',
    ].filter(Boolean)

    const newRaffleNumbersNotNegativeNumbers: number[] =
      newRaffleNumbersDirty.map(n => (+n < 0 ? -1 * +n : +n))

    const newRaffleNumbers = getArrayWithUniqueNumbersAndOrder(
      newRaffleNumbersNotNegativeNumbers
    ).map(n => n.toString())

    if (newRaffleNumbers?.length !== 5) {
      return alert('You should insert 5 valid and not repeat numbers')
    }

    const formatDate = moment(date).format(DateFormat)

    console.info('::: Sent Data: \n', { date: formatDate, newRaffleNumbers })

    try {
      const commandResponse = await raffleCommands.create(
        newRaffleNumbers,
        formatDate
      )
      console.info('Command RESPONSE ', commandResponse)
    } catch (error: any) {
      try {
        const commandResponse = await raffleCommands.create(
          newRaffleNumbers,
          formatDate
        )
        console.info('Command RESPONSE ', commandResponse)
      } catch (error: any) {
        alert(`Create Raffle Error: Please Retry latter\n ${error?.message}`)
      }
    } finally {
      setInputNumber0(null)
      setInputNumber1(null)
      setInputNumber2(null)
      setInputNumber3(null)
      setInputNumber4(null)
      history.push('/review-raffles')
    }
  }

  return (
    <>
      <Link to="/main_window"> ⏪ Go Back</Link>
      <SmallContainer>
        <h1 style={{ textAlign: 'center' }}>Add Raffle</h1>
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

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '20px 0',
            }}
          >
            {newArraySpace.map((_, index) => (
              <NumberInput
                name={'input' + index}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  objectInputHandlers[index](e.target.value?.toString())
                }
              />
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            style={{ width: 335, margin: '5px 0', alignSelf: 'center' }}
          >
            Add/Update Raffle
          </Button>
        </div>
      </SmallContainer>
    </>
  )
}
