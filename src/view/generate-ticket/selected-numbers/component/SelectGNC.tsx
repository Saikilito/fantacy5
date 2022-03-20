import { useState } from 'react'
import { Link } from 'react-router-dom'

import { selectOptions } from './selectedOptions'

// Components
import Select, { OptionsOrGroups } from 'react-select'
import { Button } from '../../../../components/Button'

type ISelectedOptions = {
  value: number | string
  label: number | string
}

type ISelectGNC = {
  handleGNC: (selectedNumbersInto: number[]) => void
  selectedOptions: ISelectedOptions[]
  selectedNumbers: number[]
  maxSelected: any
  turn: number
  pathLink?: boolean
}

export const SelectGNC = ({
  handleGNC,
  selectedOptions,
  selectedNumbers,
  maxSelected,
  turn,
  pathLink = false,
}: ISelectGNC) => {
  const selectOption = (
    selectedNumbers?.length >= maxSelected ? selectedNumbers : selectedOptions
  ) as OptionsOrGroups<any, any>

  const [selectedNumbersInto, setSelectedNumberInto] = useState([])

  const handleSelectedNumberInto = (selectedOption: any) => {
    const selectedNumbersArray = selectedOption.map((s: any) => +s.value)
    setSelectedNumberInto(selectedNumbersArray)
  }

  const handleGNCInto = (selectedNumbersInto: number[]) => {
    handleGNC(selectedNumbersInto)
    setSelectedNumberInto([])
  }

  return (
    <>
      <h2>Group of complementary numbers {turn}</h2>
      <h4>Selected {maxSelected} numbers </h4>
      <div>
        <Select
          options={selectOption}
          styles={selectOptions}
          onChange={value => handleSelectedNumberInto(value)}
          isMulti={true}
          placeholder="Click Here!"
        />
        {pathLink ? (
          <Link to={{ pathname: '/generate-ticket/present-selected-numbers' }}>
            <Button
              disabled={+selectedNumbersInto?.length !== +maxSelected}
              onClick={() => handleGNCInto(selectedNumbersInto)}
            >
              Selected Numbers
            </Button>
          </Link>
        ) : (
          <Button
            disabled={+selectedNumbersInto?.length !== +maxSelected}
            onClick={() => handleGNCInto(selectedNumbersInto)}
          >
            Selected Numbers
          </Button>
        )}
      </div>
    </>
  )
}
