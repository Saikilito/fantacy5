export const orderNumbers = (unOrderNumbers: number[]): number[] =>
  unOrderNumbers.sort(function (a, b) {
    return a - b
  })

export const getArrayWithUniqueNumbersAndOrder = (
  numbers: number[]
): number[] => {
  const unique = new Set()
  numbers.map((number: number) => unique.add(+number))
  const unOrderNumbers = Array.from(unique) as number[]
  return orderNumbers(unOrderNumbers)
}
