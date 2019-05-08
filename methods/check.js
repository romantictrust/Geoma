const isSimplePolygon = points => {
  for (let i = 0; i < Object.keys(points).length; i++) {
    for (let j = 0; j < Object.keys(points).length; j++) {
      let p1 = points[i];
      let p2 = i === Object.keys(points).length - 1 ? points[0] : points[i + 1];
      let p3 = points[j];
      let p4 = j === Object.keys(points).length - 1 ? points[0] : points[j + 1];
      if (p1 === p3 || p2 === p4 || p1 === p4 || p2 === p3) continue;
      if (isIntersect(p1, p2, p3, p4)) return false;
    }
  }
  return true;
};
const isPointInsidePolygon = (point, polygon) => {
  const segmentPoints = getSegment(point);
  let res = 0;
  if (isIntersect(polygon[polygon.length - 1], polygon[0], segmentPoints[0], segmentPoints[1])) res++;
  for (let i = 0; i < polygon.length - 1; i++) {
      const p1 = polygon[i];
      const p2 = polygon[i + 1];
      if (isIntersect(p1, p2, segmentPoints[0], segmentPoints[1])) {
          res++;
      }
  }
  return res % 2 === 1;
}
const isIntersect = (p1, p2, p3, p4) => {
  const d1 = math.det(setMatrix(p1, p3, p4));
  const d2 = math.det(setMatrix(p2, p3, p4));
  const d3 = math.det(setMatrix(p3, p1, p2));
  const d4 = math.det(setMatrix(p4, p1, p2));
  if (d1 * d2 <= 0 && d3 * d4 <= 0) return true;
  return false;
};
const isPointInsideConvexPolygon = (point, polygon) => {
  const points = polygon;
  let size = Object.keys(points).length;
  const firstEdge = [points[0], points[1]];
  const lastEdge = [points[size - 1], points[0]];
  if (
    isPointToTheRightOfLine(point, firstEdge[0], firstEdge[1]) ||
    isPointToTheRightOfLine(point, lastEdge[0], lastEdge[1])
  ) {
    return false;
  }
  const [p1, p2] = getBoundsIndexesOfSector(point, polygon);
  return !isIntersect(point, points[0], points[p1], points[p2]);
};
const isPointToTheRightOfLine = (point, p1, p2) => {
  return math.det(setMatrix(point, p1, p2)) > 0;
};
const isPointToTheLeftOfLine = (point, p1, p2) => {
  return math.det(setMatrix(point, p1, p2)) < 0;
};
