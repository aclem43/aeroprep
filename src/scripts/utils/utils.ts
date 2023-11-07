export const isEmpty = (value: unknown): boolean => {
  if (value === '') {
    return true
  }
  if (value === undefined) {
    return true
  }

  if (value === null) {
    return true
  }
  return false
}
