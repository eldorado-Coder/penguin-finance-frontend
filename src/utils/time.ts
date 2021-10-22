const monthLabels = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

export const getMonth = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.getMonth() + 1
}

export const getDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.getDate()
}

export const getMonthAndDate = (timestamp: number) => {
  const time = new Date(timestamp)
  const month = time.getMonth() + 1
  const date = time.getDate()

  return `${monthLabels[month]} ${date}`
}
