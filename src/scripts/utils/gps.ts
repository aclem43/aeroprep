export const getDistanceFromLatLonInNm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = (R * c) / 1.852
  return d
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

export const flipCoordinates = (coordinates: number[][][]): number[][][] => {
  const flippedCoordinates: number[][][] = []
  coordinates.forEach((c) => {
    const flipped: number[][] = []
    c.forEach((c2) => {
      flipped.push([c2[1], c2[0]])
    })
    flippedCoordinates.push(flipped)
  })

  return flippedCoordinates
}
export const flipCoordinate = (coordinate: number[]): number[] => {
  return [coordinate[1], coordinate[0]]
}
