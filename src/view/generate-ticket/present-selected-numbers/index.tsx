import { useContext, useRef, useEffect } from 'react'
import Pdf from 'react-to-pdf'
import moment from 'moment'

// helpers
import { AppContext, useClearStateHook } from '../../../context'
import { ticketCommands } from '../../../commands'
import { generateGuessArray } from './helpers'
import { orderNumbers } from '../../../helpers'

// Components
import { Layout } from '../../../layout'
import { SerialHeadersLayout } from '../layout'
import { Button } from '../../../components/Button'

// Constants
import { Constant } from '../../../../common/constants'

// To code
const { DateFormat } = Constant.general

const randomStyles = {
  fontWeight: 'bold',
  width: '100%',
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
    <Layout>
      <SerialHeadersLayout />

      <Pdf
        targetRef={ref}
        filename={fileName}
        options={{ unit: 'in', format: [12, 18] }}
        x={2}
        orientation="portrait"
      >
        {({ toPdf }: any) => (
          <Button
            style={{
              width: '100%',
              margin: '20px 0',
              padding: '1.5rem 0',
            }}
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
          fontSize: '0.8rem',
          width: '80vw',
        }}
        ref={ref}
      >
        <div style={{ fontSize: '0.8rem' }}>
          <h1>Selected Numbers</h1>
          <h2>Date: {moment(date).format('DD/MMM/YYYY')} </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <h2 style={{ marginTop: '2rem' }}> Headers Numbers</h2>
            <div style={{ display: 'flex' }}>
              {serialHeaders &&
                serialHeaders.map((number: number, index: number) => (
                  <div style={randomStyles} key={'g1l' + index}>
                    A{index + 1}: {number}
                  </div>
                ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <h2 style={{ marginTop: '2rem' }}> Selected Numbers</h2>
            <div style={{ display: 'flex' }}>
              {filterCurrentNumbers &&
                filterCurrentNumbers.map((number: number, index: number) => (
                  <div style={randomStyles} key={'sn' + index}>
                    {letters[index]}: {number}
                  </div>
                ))}
            </div>
          </div>
          <div className="App"></div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: '0.8rem',
          }}
        >
          <h2 style={{ marginTop: '2rem' }}>Numbers Ticket</h2>
          <br />
          {tickets.map((ts, index) => (
            <div key={index}>
              <h2 style={{ marginTop: '2rem' }}>Matrix {index + 1}</h2>
              <hr />
              <div id="container" style={{ display: 'flex' }}>
                {ts.map((t, containerIndex) => {
                  return (
                    <div
                      id="matrix"
                      key={containerIndex}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '100%',
                        fontSize: '0.8rem',
                      }}
                    >
                      <h2> Sheet {containerIndex + 1} </h2>
                      {t.map((vector, vectorIndex) => {
                        const orderVector = orderNumbers(vector)
                        return (
                          <div
                            id="vector"
                            key={vectorIndex}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              margin: 4,
                              fontSize: '0.8rem',
                            }}
                          >
                            <h3 style={{ margin: '0.2rem 0 0 0' }}>
                              Panel {panel[vectorIndex]}: {'  '}
                            </h3>
                            {orderVector.map((number, numberIndex) => {
                              return (
                                <div
                                  key={numberIndex}
                                  style={{ margin: '6px 2px' }}
                                >
                                  {number}
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}
                      <br />
                    </div>
                  )
                })}
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
