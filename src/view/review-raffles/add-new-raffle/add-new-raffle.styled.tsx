import { InputHTMLAttributes } from 'react'
import { NumberInputStyled } from './number-input.styled'

type NumberInputProps = {
  name: string
} & InputHTMLAttributes<HTMLInputElement>

const NumberInput = (props: NumberInputProps) => {
  const { name } = props
  return (
    <NumberInputStyled
      type="number"
      min={0}
      max={9}
      id={`id-${name}`}
      {...props}
    />
  )
}

export { NumberInput }
