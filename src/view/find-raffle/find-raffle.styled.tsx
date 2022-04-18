import { InputHTMLAttributes } from 'react'
import { NumberInputStyled } from '../../components'

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
      style={{
        margin: '8px 6px',
        height: '30px',
      }}
      {...props}
    />
  )
}

export { NumberInput }
