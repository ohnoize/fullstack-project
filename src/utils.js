export const timeParser = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8)
}

export default { timeParser }