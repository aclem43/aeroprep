export const calcluatePolygonArea = (polygon: number[][][]): number => {
  const area = polygon.reduce((acc, ring) => {
    const ringArea = ring.reduce((acc, point, i) => {
      const nextPoint = ring[i + 1] || ring[0]
      return acc + (point[0] * nextPoint[1] - nextPoint[0] * point[1])
    }, 0)
    return acc + Math.abs(ringArea / 2)
  }, 0)
  return area
}
