import { useState } from 'react'

import moment from 'moment'

// Helpers
import { getArrayWithUniqueNumbersAndOrder } from '../../helpers'
import { ticketCommands } from '../../commands'

// Constants
import { Constant } from '../../../common/constants'

// Components
import { Layout } from '../../layout'
import { FindRaffleComponent } from './find-raffle.component'

// To code
const { DateFormat } = Constant.general
const { orange: OrangeColor } = Constant.colors

type objectInputHandlersType = {
  [x: number]: Function
}

export function FindRaffle() {
  // Global State

  // States
  const [date, setDate] = useState(new Date().toISOString())
  const [dataFound, setDataFound] = useState<Array<any> | null>(null)

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
    const raffleToFindNumbersDirty: string[] = [
      input0 ?? '',
      input1 ?? '',
      input2 ?? '',
      input3 ?? '',
      input4 ?? '',
    ].filter(Boolean)

    const findRaffleNumbersNotNegativeNumbers: number[] =
      raffleToFindNumbersDirty.map(n => (+n < 0 ? -1 * +n : +n))

    const raffleToFindNumbers = getArrayWithUniqueNumbersAndOrder(
      findRaffleNumbersNotNegativeNumbers
    )

    if (raffleToFindNumbers?.length !== 5) {
      return alert('You should insert 5 valid and not repeat numbers')
    }

    const formatDate = moment(date).format(DateFormat)

    console.info('::: Sent Data: \n', { date: formatDate, raffleToFindNumbers })

    try {
      const commandResponse = await ticketCommands.findRaffle(
        formatDate,
        raffleToFindNumbers
      )
      if (commandResponse.success) {
        const { data } = commandResponse
        setDataFound(data)
      }

      // history.push('/review-raffles')
    } catch (error: any) {
      setInputNumber0(null)
      setInputNumber1(null)
      setInputNumber2(null)
      setInputNumber3(null)
      setInputNumber4(null)
    }
  }

  const props = {
    objectInputHandlers,
    handleChangeTime,
    handleSubmit,
    date,
  }

  return (
    <Layout>
      <FindRaffleComponent {...props} />
      <div style={{ margin: '1rem 0', width: '100%' }}>
        {dataFound &&
          dataFound.map((data, foundIndex) => {
            const { matrix, sheet, panel, foundNumbers } = data
            return (
              <div
                key={foundIndex}
                style={{ width: '100%', textAlign: 'center' }}
              >
                <div
                  style={{
                    fontSize: 20,
                    width: '100%',
                    border: '1px solid white',
                    padding: 10,
                    margin: '1rem 0',
                  }}
                >
                  <p>
                    <strong style={{ color: OrangeColor }}>In Matrix:</strong>{' '}
                    {matrix}
                  </p>
                  <p>
                    <strong style={{ color: OrangeColor }}>Sheet:</strong>{' '}
                    {sheet}
                  </p>
                  <p>
                    <strong style={{ color: OrangeColor }}>Panel:</strong>{' '}
                    {panel}
                  </p>
                  <p>
                    <strong style={{ color: OrangeColor }}>Total Found:</strong>{' '}
                    {foundNumbers.length}
                  </p>
                  <p>
                    <strong style={{ color: OrangeColor }}>Numbers:</strong>
                    {'  '}
                    {foundNumbers.map((number: number, numberIndex: number) =>
                      numberIndex !== foundNumbers.length - 1 ? (
                        <span>{number}, </span>
                      ) : (
                        number
                      )
                    )}
                  </p>
                </div>
                <hr />
              </div>
            )
          })}
      </div>
    </Layout>
  )
}
