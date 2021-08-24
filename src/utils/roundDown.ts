const roundDown = (value, decimals = 18) => {
  const valueString = value.toString()
  const integerString = valueString.split('.')[0]
  const decimalsString = valueString.split('.')[1]
  if (valueString.slice(-1) === '.') {
    return value
  }
  if (!decimalsString) {
    return integerString
  }
  return `${integerString}.${decimalsString.slice(0, decimals)}`
}

export default roundDown
