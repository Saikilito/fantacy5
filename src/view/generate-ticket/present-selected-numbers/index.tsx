import { useContext, useRef, useEffect } from 'react'
import Pdf from 'react-to-pdf'
import moment from 'moment'

// helpers
import { AppContext, useClearStateHook } from '../../../context'
import { ticketCommands } from '../../../commands'
import { generateGuessArray } from './helpers'
import { orderNumbers } from '../../../helpers'

// Components
import { SerialHeadersLayout } from '../layout'
import { Button } from '../../../components/Button'

// Constants
import { Constant } from '../../../../common/constants'

// To code
const { DateFormat } = Constant.general

const randomStyles = {
  fontWeight: 'bold',
  height: '25px',
  margin: '10px 5px',
  padding: '10px 5px',
  borderRadius: '0.3rem',
  background: '#3498db',
} as any

export const PresentSelectedNumbers = () => {
  // Global State
  const { date, currentNumbers, serialHeaders } = useContext(AppContext)
  const ref = useRef(null)

  const panel = ['A', 'B', 'C', 'D', 'E']
  const { tickets, letters, filterCurrentNumbers } = generateGuessArray(
    currentNumbers,
    serialHeaders
  )

  const saveTicket = async () => {
    const objectNumbers = {
      tickets,
      serialHeaders,
      selectedNumbers: filterCurrentNumbers,
    }
    if (filterCurrentNumbers?.length === 11) {
      console.info(objectNumbers)
      try {
        const formatDate = moment(date).format(DateFormat)
        await ticketCommands.create(objectNumbers, formatDate)
      } catch (error) {
        alert('Error into ticket create for data base ')
      }
    }
  }
  useEffect(() => {
    saveTicket()

    return () => useClearStateHook()
  }, [])

  const fileName = moment(date).format('DD/MMM/YYYY') + ' - raffles.pdf'
  return (
    <SerialHeadersLayout>
      <Pdf
        targetRef={ref}
        filename={fileName}
        options={{ unit: 'in', format: [18, 25] }}
        x={5}
        orientation="portrait"
      >
        {({ toPdf }: any) => (
          <Button
            style={{ width: '100%', display: 'inline', margin: '20px 0' }}
            onClick={toPdf}
          >
            Generate Pdf
          </Button>
        )}
      </Pdf>

      <div
        style={{
          textAlign: 'center',
          backgroundColor: '#fff',
          padding: 30,
          color: 'black',
        }}
        ref={ref}
      >
        <div>
          <h1>Selected Numbers</h1>
          <h2>Date: {moment(date).format('DD/MMM/YYYY')} </h2>
          <div style={{ display: 'flex' }}>
            <h2> Headers Numbers</h2>
            {serialHeaders &&
              serialHeaders.map((number: number, index: number) => (
                <div style={randomStyles} key={'g1l' + index}>
                  A{index + 1}: {number}
                </div>
              ))}
          </div>
          <div style={{ display: 'flex' }}>
            <h2> Selected Numbers</h2>
            {filterCurrentNumbers &&
              filterCurrentNumbers.map((number: number, index: number) => (
                <div style={randomStyles} key={'sn' + index}>
                  {letters[index]}: {number}
                </div>
              ))}
          </div>
          <div className="App"></div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2>Numbers Ticket</h2>
          <br />
          {tickets.map((ts, index) => (
            <>
              <h2>Matrix {index + 1}</h2>
              <hr />
              <div id="container" style={{ display: 'flex' }}>
                {ts.map((t, containerIndex) => {
                  return (
                    <>
                      <div
                        id="matrix"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          width: '100%',
                        }}
                      >
                        <h2> Sheet {containerIndex + 1} </h2>
                        {t.map((vector, vectorIndex) => {
                          const orderVector = orderNumbers(vector)
                          return (
                            <>
                              <div
                                id="vector"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  margin: 4,
                                  fontSize: 18,
                                }}
                              >
                                <h3 style={{ margin: '0.2rem 0 0 0' }}>
                                  Panel {panel[vectorIndex]}: {'  '}
                                </h3>
                                {orderVector.map(number => {
                                  return (
                                    <div style={{ margin: 6 }}>{number}</div>
                                  )
                                })}
                              </div>
                            </>
                          )
                        })}
                        <br />
                      </div>
                    </>
                  )
                })}
              </div>
              <hr />
            </>
          ))}
        </div>
      </div>
    </SerialHeadersLayout>
  )
}
