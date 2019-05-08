SPEED = 2;

const generateSheeps = n => {
  const res = Array(n)
    .fill(null)
    .map(item => {
      const point = generatePointInsidePen();
      const alfa = Math.random() * Math.PI * 2;
      return {
        point,
        vector: [SPEED * Math.cos(alfa), SPEED * Math.sin(alfa)]
      };
    });
  return res;
};
const drawField = () => {
  const polygon = createConvexPolygon();
  drawPolygon(polygon, "green");
  const pit = createSimplePolygon();
  drawPolygon(pit, "red");
};
const generatePointInsidePen = () => {
  const point = getRandomPoint();
  if (
    isPointInsideConvexPolygon(point, createConvexPolygon()) &&
    !isPointInsidePolygon(point, createSimplePolygon())
  ) {
    return point;
  }
  return generatePointInsidePen();
};
