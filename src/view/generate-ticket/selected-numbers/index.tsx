import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'

import { Constant } from '../../../../common/constants'

import { getArrayWithUniqueNumbersAndOrder } from '../../../helpers'
import { getGNCObject, maxSelectedObject, initGNCOptions } from './helpers'

// Context
import { AppContext } from '../../../context'

// Layout
import { SerialHeadersLayout } from '../layout'

// Types
import { IMapNumbers } from '../../../../common/constants/constants.types'
import { INumberGroups } from '../../../context/AppContext.type'

// Components
import { SmallContainer } from './generate-ticket.styled'
import { SelectGNC } from './component'

export function SelectedNumbers() {
  const history = useHistory()

  // Global State
  const {
    date,

    raffleData,

    serialHeaders,

    numberGroups,
    setNumberGroups,

    currentNumbers,
    setCurrentNumbers,

    setCurrentSelectedNumberGroups,
  } = useContext(AppContext)

  // Local State
  const [selectedNumbers, setSelectedNumber] = useState([])
  const [gncOptions, setGNCOptions] = useState(initGNCOptions)
  const [selectedOptions, setSelectOptions] = useState([{ value: 0, label: 0 }])

  useEffect(() => {
    console.info('Generate Tickets data', raffleData)
    handleOptions()
  }, [date, raffleData?.raffles])

  // Set first options for be select
  const handleOptions = () => {
    if (!raffleData.raffles.length) {
      console.info(':::: Loading Raffles... ')
      return null
    }

    const numberGroupsObject = getGNCObject(raffleData.raffles)
    setNumberGroups(numberGroupsObject)
    console.info({ numberGroupsObjectComplete: numberGroupsObject })
    console.info({ numberGroupsObject: numberGroupsObject.one })
    const selectOptionsArray = numberGroupsObject.one
      .filter(ngb => !serialHeaders.find(n => ngb === n))
      .map(n => ({
        value: n,
        label: n,
      }))
    setSelectOptions(selectOptionsArray)
  }

  // Order all groups of the numbers selected
  const handleSetCurrentNumbers = (numbers: number[]) => {
    const clearNumbers = getArrayWithUniqueNumbersAndOrder([
      ...currentNumbers,
      ...numbers,
    ])
    setCurrentNumbers(_ => [...clearNumbers])
  }

  const handlerGNCs = (selectedNumbersInto: number[]) => {
    const selectedNumbers = selectedNumbersInto?.map(n => +n)
    handleSetCurrentNumbers(selectedNumbers)
    setCurrentSelectedNumberGroups((currentValue: any) => [
      ...currentValue,
      selectedNumbersInto,
    ])

    // Change the current turn
    setGNCOptions(currentValue => ({
      turn: +currentValue.turn + 1,
    }))

    const currentTurn = (gncOptions.turn + 1).toString() as keyof IMapNumbers
    const map = Constant.mapNumbers[currentTurn] as keyof INumberGroups

    const oneTurn = '1' as keyof IMapNumbers
    const twoTurn = '2' as keyof IMapNumbers

    const mapOne = Constant.mapNumbers[oneTurn] as keyof INumberGroups
    const mapTwo = Constant.mapNumbers[twoTurn] as keyof INumberGroups

    const turnMap = {
      1: [...numberGroups[mapOne]],
      2: [...numberGroups[mapOne], ...numberGroups[mapTwo]],
    } as any

    let newOptions = numberGroups[map]?.filter(
      n =>
        ![
          ...currentNumbers,
          ...selectedNumbers,
          ...selectedNumbersInto,
          ...(turnMap[gncOptions.turn] ?? []),
        ].find(c => +n === +c)
    )

    if (+gncOptions.turn === 3) {
      // Only number out of the draw
      newOptions = numberGroups[map]
    }

    const selectOptionsArray = newOptions?.map(n => ({
      value: n,
      label: n,
    }))

    // Clear selected Number Array
    setSelectedNumber([])
    setSelectOptions(selectOptionsArray)

    if (+gncOptions.turn === 4) {
      history.push('/generate-ticket/present-selected-numbers')
    }
  }

  const maxSelectedByTurn = maxSelectedObject[gncOptions?.turn] ?? 0

  return (
    <SerialHeadersLayout>
      {!!raffleData?.raffles?.length && (
        <>
          <SmallContainer>
            <SelectGNC
              maxSelected={maxSelectedByTurn}
              key={'selectGNC' + gncOptions.turn}
              turn={+gncOptions.turn}
              selectedNumbers={selectedNumbers}
              selectedOptions={selectedOptions}
              handleGNC={handlerGNCs}
              pathLink={false && gncOptions.turn === 4}
            />
          </SmallContainer>
        </>
      )}
    </SerialHeadersLayout>
  )
}
