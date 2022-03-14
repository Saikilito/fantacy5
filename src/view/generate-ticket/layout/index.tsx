import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Constant } from '../../../../common/constants'
import { raffleCommands } from '../../../commands'

// Context
import { AppContext } from '../../../context'

// Components
import { SmallContainer } from '../../../components/SmallContainer'

const { DateFormat } = Constant.general

export function SerialHeadersLayout({ children }: any) {
  // Global State
  const {
    date,

    serialHeaders,
    setSerialHeaders,

    raffleData,
    setRaffleData,

    setCurrentNumbers,

    currentSelectedNumberGroups,
  } = useContext(AppContext)

  useEffect(() => {
    handleSelectDate()
  }, [date])

  const handleSelectDate = async () => {
    if (serialHeaders.length) {
      return null
    }

    const newDate = moment(date).subtract(1, 'day').format(DateFormat)
    const tenDaysAgo = moment(newDate, DateFormat)
      .subtract(9, 'days')
      .format(DateFormat)

    const dataToBeSent = {
      startDate: tenDaysAgo,
      endDate: newDate,
    }

    // Get All Data
    const result = await raffleCommands.getByRange(dataToBeSent)

    const raffles = result?.data
    setRaffleData({ raffles })

    // Get Serial Headers
    const serialHeads = raffles[raffles.length - 1].drawingNumbers
    setSerialHeaders(serialHeads)
    setCurrentNumbers(serialHeads)
  }

  const randomStyles = {
    fontWeight: 'bold',
    margin: '5px 10px',
    padding: '5px',
    borderRadius: '0.3rem',
    background: '#3498db',
  } as any

  return (
    <div style={{ display: 'flex' }}>
      {/* Serial Headers */}
      <SmallContainer>
        <Link style={{ fontWeight: 'bold' }} to="/main_window">
          ⏪ Go Back
        </Link>

        <h2>Date: {date} </h2>

        <h2>Serial Headers</h2>
        <div style={{ display: 'flex' }}>
          {serialHeaders &&
            serialHeaders.map((number: number, index: number) => (
              <div style={randomStyles} key={'header 1' + index}>
                A{index + 1}: {number}
              </div>
            ))}
        </div>
        {!!currentSelectedNumberGroups.length &&
          currentSelectedNumberGroups.map((gnc: number[], i: number) => {
            return (
              <>
                <h2>GNC {i + 1} </h2>
                <div style={{ display: 'flex' }}>
                  {gnc.map((number, index) => {
                    return (
                      <div style={randomStyles} key={'gnc' + index + i}>
                        {number}
                      </div>
                    )
                  })}
                </div>
              </>
            )
          })}
      </SmallContainer>

      {raffleData?.raffles?.length ? (
        <SmallContainer>{children}</SmallContainer>
      ) : (
        <SmallContainer>
          <h1>No Raffles</h1>
        </SmallContainer>
      )}
    </div>
  )
}
