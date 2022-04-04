import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Layout } from '../../../layout'
import { AppContext } from '../../../context'
import { Constant } from '../../../../common/constants'

// Components
import { Title } from '../../../components/'
import { Button } from '../../../components/Button'

// To Code
const { orange: OrangeColor } = Constant.colors

export function SelectedDate() {
  // Global State
  const { date, setDate } = useContext(AppContext)

  const handleChangeTime = async (date: string) => {
    setDate(date)
  }
  return (
    <Layout>
      {/* <SmallContainer> */}
      <Title style={{ color: OrangeColor }}>Generate Ticket</Title>

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
          style={{ alignSelf: 'center', width: '80%' }}
          onChange={date => handleChangeTime(date.target.value)}
        />
        <Link
          style={{ display: 'block', width: '80%', alignSelf: 'center' }}
          to="/generate-ticket/selected-numbers"
        >
          <Button style={{ width: '100%', margin: '32px auto' }}>
            Selected Date
          </Button>
        </Link>
      </div>
      {/* </SmallContainer> */}
    </Layout>
  )
}
