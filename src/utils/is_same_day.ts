/**
 * Checks if the same day
 * @param firstDate - The `date` to be formatted
 * @param secondDate - The `date` to be formatted
 * @returns A boolean with 'true' if is the same day and 'false' if not
 */
const isSameDay = (firstDate: Date, secondDate: Date): boolean => {
  let isSame = true

  if (firstDate.getDate() !== secondDate.getDate()) {
    isSame = false
  }
  if (firstDate.getMonth() !== secondDate.getMonth()) {
    isSame = false
  }
  if (firstDate.getFullYear() !== secondDate.getFullYear()) {
    isSame = false
  }

  return isSame
}

export default isSameDay
