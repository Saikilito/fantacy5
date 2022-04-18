import { ChangeEvent } from 'react'

import { SmallContainer, Button, Title } from '../../components'
import { NumberInput } from './find-raffle.styled'

export function FindRaffleComponent({
  date,
  handleChangeTime,
  handleSubmit,
  objectInputHandlers,
}: any) {
  const newArraySpace = Array.from(new Array(5))
  return (
    <SmallContainer>
      <Title>Find Raffle</Title>
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
          style={{ alignSelf: 'center', width: '100%' }}
          onChange={date => handleChangeTime(date.target.value)}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0',
          }}
        >
          {newArraySpace.map((_, index) => (
            <NumberInput
              key={index}
              name={'input' + index}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                objectInputHandlers[index](e.target.value?.toString())
              }
            />
          ))}
        </div>

        <Button onClick={handleSubmit}>Find Raffle</Button>
      </div>
    </SmallContainer>
  )
}
