import { createContext, useState } from 'react'
import moment from 'moment'

import { IArgs, IValueContextArgs } from './AppContext.type'
import { Constant } from '../../common/constants'

const { DateFormat } = Constant.general

const now = moment().format(DateFormat)

const defaultValue = {
  date: now,
  setDate: () => {},

  // raffle data
  raffleData: {
    raffles: [],
  },
  setRaffleData: () => {},

  // Serial Headers
  serialHeaders: [],
  setSerialHeaders: () => {},

  // Number in memory
  currentNumbers: [],
  setCurrentNumbers: () => {},

  // All Number groups
  numberGroups: {
    gncOne: [],
    gncTwo: [],
    gncThree: [],
    gncFour: [],
  },
  setNumberGroups: () => {},

  // GNC Selected
  currentSelectedNumberGroups: [],
  setCurrentSelectedNumberGroups: () => {},
} as IValueContextArgs

const AppContext = createContext(defaultValue)
const { Provider, Consumer } = AppContext

const AppProvider = ({ children }: IArgs) => {
  const [date, setDate] = useState(now)
  const [raffleData, setRaffleData] = useState({ raffles: [] })
  const [serialHeaders, setSerialHeaders] = useState([])
  const [currentNumbers, setCurrentNumbers] = useState([])
  const [numberGroups, setNumberGroups] = useState({
    gncOne: [],
    gncTwo: [],
    gncThree: [],
    gncFour: [],
  })
  const [currentSelectedNumberGroups, setCurrentSelectedNumberGroups] =
    useState([])

  return (
    <Provider
      value={{
        date,
        setDate,

        raffleData,
        setRaffleData,

        serialHeaders,
        setSerialHeaders,

        numberGroups,
        setNumberGroups,

        currentNumbers,
        setCurrentNumbers,

        currentSelectedNumberGroups,
        setCurrentSelectedNumberGroups,
      }}
    >
      {children}
    </Provider>
  )
}

export { AppProvider, Consumer as AppConsumer, AppContext }
