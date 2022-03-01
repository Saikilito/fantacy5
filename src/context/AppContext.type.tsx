import { ReactChild, Dispatch, SetStateAction } from 'react'
import { IRaffles } from '../../common/types'
export type IArgs = {
  children: ReactChild
}

type IStateType = Dispatch<SetStateAction<string>>
type IStateData = Dispatch<SetStateAction<any>>

export type INumberGroups = {
  gncOne: number[]
  gncTwo: number[]
  gncThree: number[]
  gncFour: number[]
}

export type IValueContextArgs = {
  date: string
  setDate: IStateType

  raffleData: IRaffles
  setRaffleData: IStateData

  // Serial Headers
  serialHeaders: number[]
  setSerialHeaders: IStateData

  // Numbers in memory
  currentNumbers: number[]
  setCurrentNumbers: IStateData

  // All Numbers Groups
  numberGroups: INumberGroups
  setNumberGroups: IStateData

  // GNC Selected
  currentSelectedNumberGroups: number[]
  setCurrentSelectedNumberGroups: IStateData
}
