import { IRaffle } from '../../../../../common/types'
import { getArrayWithUniqueNumbersAndOrder } from '../../../../helpers'

export const getGNCObject = (raffles: IRaffle[]) => {
  const getMatrixDrawingNumbers = raffles.map(raffle => raffle.drawingNumbers)

  const [
    tenDrawBefore,
    nineDrawBefore,
    eightDrawsBefore,
    sevenDrawsBefore,
    sixDrawsBefore,
    fiveDrawsBefore,
    fourDrawsBefore,
    threeDrawsBefore,
    twoDrawsBefore,
    oneDrawBefore,
  ] = getMatrixDrawingNumbers

  const allRaffleNumbers = [
    ...tenDrawBefore,
    ...nineDrawBefore,
    ...eightDrawsBefore,
    ...sevenDrawsBefore,
    ...sixDrawsBefore,
    ...fiveDrawsBefore,
    ...fourDrawsBefore,
    ...threeDrawsBefore,
    ...twoDrawsBefore,
    ...oneDrawBefore,
  ]

  const numbersArray = generateArrayOfNumbersForRaffles(1, 36)
  const missingRafflesNumber = numbersArray
    .map(n => {
      const numberFound = allRaffleNumbers.some(rf => +rf === +n)
      if (numberFound) {
        return null
      }
      return +n
    })
    ?.filter(Boolean) as number[]

  return {
    one: getArrayWithUniqueNumbersAndOrder([
      ...twoDrawsBefore,
      ...threeDrawsBefore,
    ]),
    two: getArrayWithUniqueNumbersAndOrder([
      ...fiveDrawsBefore,
      ...fourDrawsBefore,
    ]),
    three: getArrayWithUniqueNumbersAndOrder([
      ...tenDrawBefore,
      ...nineDrawBefore,
      ...eightDrawsBefore,
      ...sevenDrawsBefore,
      ...sixDrawsBefore,
    ]),
    four: getArrayWithUniqueNumbersAndOrder(missingRafflesNumber),
  }
}

const generateArrayOfNumbersForRaffles = (min: number, max: number) => {
  const array = [] as Array<number>
  for (let index = min; index <= max; index++) {
    array.push(index)
  }

  return array
}

type anyObject = {
  [key: number]: number
}

export const maxSelectedObject: anyObject = {
  1: 4,
  2: 3,
  3: 2,
  4: 2,
}

// Init State
export type IGNCOptions = {
  turn: number
}
export const initGNCOptions = {
  turn: 1,
} as IGNCOptions
