import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from '../../../context'

// Components
import { SmallContainer } from '../selected-numbers/generate-ticket.styled'
import { Button } from '../../../components/Button'

export function SelectedDate() {
  // Global State
  const { date, setDate } = useContext(AppContext)

  const handleChangeTime = async (date: string) => {
    setDate(date)
  }
  return (
    <>
      <Link to="/main_window"> ⏪ Go Back</Link>
      <SmallContainer>
        <h1 style={{ textAlign: 'center' }}>Generate Ticket</h1>
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
          <Link
            style={{ display: 'block', width: '17%', alignSelf: 'center' }}
            to="/generate-ticket/selected-numbers"
          >
            <Button>Selected Date</Button>
          </Link>
        </div>
      </SmallContainer>
    </>
  )
}
