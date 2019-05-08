const setPoint = (x, y) => {
  return { x, y };
};
const setPolygon = points => {
  return {points};
}
const setMatrix = (p1, p2, p3) => {
  return math.matrix([
    [ p3.x - p2.x, p3.y - p2.y ],
    [ p1.x - p2.x, p1.y - p2.y ]
  ]);
};
const setRandomDirectionVector = (point, polygon) => {
  const randomSide = getRandomPolygonSide(polygon);
  const randomPointAtTheSide = getRandomPointAtTheSide(randomSide);
};
