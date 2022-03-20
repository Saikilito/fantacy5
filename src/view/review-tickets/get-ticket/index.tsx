import { useState } from 'react'
import { Link } from 'react-router-dom'

import moment from 'moment'

// Helpers
import { ticketCommands } from '../../../commands'

// Constants
import { Constant } from '../../../../common/constants'

// Components
import { SmallContainer, Button } from '../../../components'

// To code
const { DateFormat } = Constant.general

const randomStyles = {
  fontWeight: 'bold',
  height: '18px',
  width: '20px',
  textAlign: 'center',
  margin: '10px 15px',
  padding: '10px 5px',
  borderRadius: '0.3rem',
  background: '#3498db',
} as any

export function GetTicket() {
  // States
  const [date, setDate] = useState(new Date().toISOString())
  const [tickets, setTickets] = useState([])

  const handleChangeTime = async (date: string) => {
    setDate(date)
  }

  const handleSubmit = async () => {
    try {
      const formatDate = moment(date).format(DateFormat)
      const response = await ticketCommands.getByDate(formatDate)
      console.info(response.data)
      const [tickets] = response.data
      console.info('::: Tickets', tickets)
      setTickets(tickets)
      console.info('Get Ticket Command Response: ', response)
    } catch (error: any) {
      alert(`Error at Get Ticket Command \n ${error.message}`)
    }
  }

  return (
    <>
      <Link to="/main_window"> ⏪ Go Back</Link>
      <SmallContainer>
        <h1 style={{ textAlign: 'center' }}>Get Ticket</h1>
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

          <Button
            onClick={handleSubmit}
            style={{ width: 335, margin: '5px 0', alignSelf: 'center' }}
          >
            Get Ticket
          </Button>
        </div>
      </SmallContainer>
      <SmallContainer>
        <h2 style={{ textAlign: 'center' }}>Ticket found:</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            justifySelf: 'center',
          }}
        >
          {tickets?.objectNumbers ? (
            <>
              <h3 style={{ textAlign: 'center' }}>Serial Headers:</h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {tickets?.objectNumbers?.serialHeaders?.map(
                  (header: number) => (
                    <p style={randomStyles}>{header}</p>
                  )
                )}
              </div>
              <hr />
              <h3 style={{ textAlign: 'center' }}>Selected Numbers:</h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {tickets?.objectNumbers?.selectedNumbers?.map((n: number) => (
                  <p style={randomStyles}>{n}</p>
                ))}
              </div>
              <hr />
              <h3 style={{ textAlign: 'center' }}>Matrix Tickets:</h3>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  maxWidth: '100vw',
                }}
              >
                {tickets?.objectNumbers?.tickets?.map(
                  (matrix3D: number[][][], index: number) => (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h4>Matrix {index + 1}</h4>
                      <div>
                        {matrix3D.map((matrix, i) => (
                          <>
                            <div style={{ width: 600, alignSelf: 'center' }}>
                              <h4>Sheet {i + 1}</h4>
                              {matrix.map(array => (
                                <>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignSelf: 'center',
                                    }}
                                  >
                                    {array.map(m => (
                                      <p>{m} - </p>
                                    ))}
                                  </div>
                                </>
                              ))}
                              <br />
                            </div>
                            <br />
                          </>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <p style={{ ...randomStyles, width: 300, padding: 10 }}>
              Ticket not found
            </p>
          )}
        </div>
      </SmallContainer>
    </>
  )
}
