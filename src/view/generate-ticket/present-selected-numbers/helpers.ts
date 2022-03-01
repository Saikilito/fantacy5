/* eslint-disable dot-notation */
export const generateGuessArray = (
  currentNumbers: number[],
  serialHeaders: number[]
) => {
  const letters = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

  const filterCurrentNumbers = currentNumbers?.filter(
    n => !serialHeaders?.some(sh => +sh === +n)
  )

  console.info({ filterCurrentNumbers })

  const mapObject = {} as any
  letters.forEach((l, i) => {
    mapObject[`${l}`] = filterCurrentNumbers[i]
  })

  const guessArray = (header: number) => [
    [
      [header, mapObject['B'], mapObject['C'], mapObject['E'], mapObject['L']],
      [header, mapObject['B'], mapObject['D'], mapObject['F'], mapObject['K']],
      [header, mapObject['B'], mapObject['D'], mapObject['H'], mapObject['I']],
      [header, mapObject['B'], mapObject['E'], mapObject['G'], mapObject['J']],
      [header, mapObject['B'], mapObject['G'], mapObject['I'], mapObject['L']],
    ],
    [
      [header, mapObject['B'], mapObject['J'], mapObject['K'], mapObject['L']],
      [header, mapObject['C'], mapObject['D'], mapObject['G'], mapObject['J']],
      [header, mapObject['C'], mapObject['E'], mapObject['J'], mapObject['K']],
      [header, mapObject['C'], mapObject['F'], mapObject['G'], mapObject['K']],
      [header, mapObject['C'], mapObject['F'], mapObject['H'], mapObject['J']],
    ],
    [
      [header, mapObject['C'], mapObject['F'], mapObject['I'], mapObject['L']],
      [header, mapObject['C'], mapObject['G'], mapObject['H'], mapObject['K']],
      [header, mapObject['C'], mapObject['I'], mapObject['J'], mapObject['L']],
      [header, mapObject['D'], mapObject['E'], mapObject['F'], mapObject['H']],
      [header, mapObject['D'], mapObject['E'], mapObject['K'], mapObject['L']],
    ],
    [
      [header, mapObject['D'], mapObject['G'], mapObject['I'], mapObject['J']],
      [header, mapObject['D'], mapObject['H'], mapObject['J'], mapObject['L']],
      [header, mapObject['E'], mapObject['F'], mapObject['I'], mapObject['J']],
      [header, mapObject['E'], mapObject['H'], mapObject['I'], mapObject['K']],
      [header, mapObject['F'], mapObject['G'], mapObject['H'], mapObject['L']],
    ],
  ]

  const tickets = serialHeaders.map(sh => guessArray(+sh))

  return {
    tickets,
    letters,
    filterCurrentNumbers,
  }
}
