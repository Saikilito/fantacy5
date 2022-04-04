import { useEffect, useContext } from 'react'
import moment from 'moment'

import { Constant } from '../../../../common/constants'
import { raffleCommands } from '../../../commands'

// Context
import { AppContext } from '../../../context'

// Components
import { Layout } from '../../../layout'
import { Title, Subtitle } from '../../../components/'

const { DateFormat } = Constant.general
const { orange: OrangeColor } = Constant.colors

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
    if (serialHeaders?.length) {
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
    const serialHeads = raffles[raffles?.length - 1].drawingNumbers
    setSerialHeaders(serialHeads)
    setCurrentNumbers(serialHeads)
  }

  const randomStyles = {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    margin: '5px 1px',
    padding: '10px',
    borderRadius: '0.3rem',
    background: OrangeColor,
  } as any

  return (
    <Layout maxSpace={true}>
      <>
        {/* Serial Headers */}
        <h4 style={{ fontStyle: 'italic' }}>Date: {date} </h4>

        <Title> Serial Headers </Title>
        <div style={{ display: 'flex', width: '100%' }}>
          {serialHeaders &&
            serialHeaders.map((number: number, index: number) => (
              <div style={randomStyles} key={'header 1' + index}>
                A{index + 1}: {number}
              </div>
            ))}
        </div>

        {!!currentSelectedNumberGroups?.length &&
          currentSelectedNumberGroups.map((gnc: number[], i: number) => {
            return (
              <>
                <Subtitle>Group complementary {i + 1} </Subtitle>
                <div style={{ display: 'flex', width: '100%' }}>
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

        {raffleData?.raffles?.length ? <>{children}</> : <h1>No Raffles</h1>}
      </>
    </Layout>
  )
}
