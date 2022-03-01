import { useContext, useEffect } from 'react'
import { AppContext } from './AppContext'
import moment from 'moment'

import { Constant } from '../../common/constants'

const { DateFormat } = Constant.general
const now = moment().format(DateFormat)

export const useClearStateHook = () => {
  // Global State
  const {
    setDate,

    setRaffleData,

    setSerialHeaders,

    setNumberGroups,

    setCurrentNumbers,

    setCurrentSelectedNumberGroups,
  } = useContext(AppContext)

  try {
    console.info('::: Cleaning Context State')

    useEffect(() => {
      setDate(now)

      setRaffleData({
        raffles: [],
      })

      setSerialHeaders([])

      setCurrentNumbers([])

      setNumberGroups({
        gncOne: [],
        gncTwo: [],
        gncThree: [],
        gncFour: [],
      })

      setCurrentSelectedNumberGroups([])
    }, [])

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
