export const shorternNumber = (number) => {
  return number >= 1000 ? Math.round(number / 100.0) / 10 + 'k' : number
}
