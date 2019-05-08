const INTERVAL_TIMER = 250;

const updateSheeps = sheeps => {
    return sheeps
      .map(sheep => {
        const { point, vector } = sheep;
        const newPoint = setPoint(point.x + vector[0], point.y + vector[1]);
        let newVector = vector;
        if (!isPointInsideConvexPolygon(newPoint, createConvexPolygon())) {
          const [p1, p2] = getBoundsIndexesOfSector(newPoint, createConvexPolygon());
          const penPoints = getPolygonPoints(createConvexPolygon());
          const boundVector = [
            penPoints[p2].x - penPoints[p1].x,
            penPoints[p2].y - penPoints[p1].y
          ];
          const factor =
            (2 * (vector[0] * boundVector[0] + vector[1] * boundVector[1])) /
            (boundVector[0] * boundVector[0] + boundVector[1] * boundVector[1]);
          newVector = [
            boundVector[0] * factor - vector[0],
            boundVector[1] * factor - vector[1]
          ];
          newPoint.x = point.x + newVector[0];
          newPoint.y = point.y + newVector[1];
        }
        return {
          point: newPoint,
          vector: newVector
        };
      })
      .filter(sheep => {
        const { point } = sheep;
        return !isPointInsidePolygon(point, createSimplePolygon());
      });
  };

  const grahamAnimate = points => {
    let index = 0;
    var start = new Date()
  const intervalFun = () => {
    if (index > changes.length) {
      clearInterval(interval);
      return;
    }
    clearCtx();
    drawPoints(points);
    const polygon = (changes[index] || changes[index - 1]);
    if (index === changes.length) {
      clearInterval(intervalFun);
      clearCtx();
      drawPolygon(polygon, 'green');
      drawPoints(points, false, 'green');
      var end = new Date() - start
      resolve(`Drawn in ${end/1000}s`);
    }
    else
    drawPolygon(polygon);
    index++;
  };
  const interval = setInterval(intervalFun, INTERVAL_TIMER);
  }

  const updatePoints = (points, polygon) => {
    points.forEach(point => {
      const { vector } = point;
      const newPoint = setPoint(point.x + vector[0], point.y + vector[1]);
      let newVector = vector;
      if (!isPointInsideConvexPolygon(newPoint, polygon)) {
        const [ p1, p2 ] = getBoundsIndexesOfSector(newPoint, polygon);
        const polygonPoints = getPolygonPoints(polygon);
        const boundVector = [
          polygonPoints[p2].x - polygonPoints[p1].x, polygonPoints[p2].y - polygonPoints[p1].y
        ];
        const factor = 2 * (vector[0] * boundVector[0] + vector[1] * boundVector[1])
          / (boundVector[0] * boundVector[0] + boundVector[1] * boundVector[1]);
        newVector = [ boundVector[0] * factor - vector[0], boundVector[1] * factor - vector[1] ];
        newPoint.x = point.x + newVector[0];
        newPoint.y = point.y + newVector[1];
      }
      point.x = newPoint.x;
      point.y = newPoint.y;
      point.vector = newVector;
    })
  };
  