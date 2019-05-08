const getRandomPoint = () => {
  return setPoint(
    Math.ceil(Math.random() * canvas.width),
    Math.ceil(Math.random() * canvas.height)
  );
};
function getRandomPoints(size) {
  const points = [];
  for (let i = 0; i < size; i++) {
    points.push(getRandomPoint(ctx.width, ctx.height));
  }
  return points;
}
const getRandomSimplePolygon = size => {
  const points = Array(size)
    .fill(null)
    .map(element =>
      setPoint(
        Math.random() * (canvas.width - 10),
        Math.random() * (canvas.height - 10)
      )
    );
  return isSimplePolygon(points) ? points : getRandomSimplePolygon(size);
};
const getPolygonPoints = polygon => {
  const points = polygon;
  let size = Object.keys(points).length;
  return points;
};
const getSegment = point => {
  return [point, { x: canvas.width - 10, y: point.y }];
};
const getRandomPolygonSide = polygon => {
  let index1 = Math.ceil(Math.random() * polygon.length) - 1;
  let index2 = index1 == polygon.length - 1 ? index1 - 1 : index1 + 1;
  return [polygon[index1], polygon[index2]];
};
const getRandomPointInsidePolygon = (mainPolygon, innerPolygon) => {
  const point = getRandomPoint(canvas.width, canvas.height);
  if (
    isPointInsidePolygon(point, mainPolygon) &&
    !isPointInsidePolygon(point, innerPolygon)
  ) {
    return point;
  }
  return getRandomPointInsidePolygon(mainPolygon, innerPolygon);
};
const getRandomPointsInsidePolygon = (size, mainPolygon, innerPolygon) => {
  const res = [];
  for (let i = 0; i < size; i++) {
    const point = getRandomPointInsidePolygon(mainPolygon, innerPolygon);
    setRandomDirectionVector(point, mainPolygon);
    res.push(point);
  }
  return res;
};
const getTopPoint = points => {
  return points.reduce((acc, cur) => {
    return acc.y > cur.y ? cur : acc;
  }, points[0]);
};
const getPosition = (point, beginLine, endLine) => {
  const det = math.det(setMatrix(point, beginLine, endLine));
  if (det > 0) return 1;
  return -1;
}
const getBoundsIndexesOfSector = (point, polygon) => {
  const points = getPolygonPoints(polygon);
  let p = 0;
  let r = Object.keys(points).length - 1;
  let q;
  while (r - p > 1) {
    q = Math.ceil((p + r) / 2);
    if (isPointToTheLeftOfLine(point, points[0], points[q])) {
      p = q;
    } else {
      r = q;
    }
  }
  return [ p, r ];
};
const getSegmentToRightBorderFromPoint = point => {
  return [
    point,
    {x: canvas.width, y: point.y}
  ]
};
const getRandomPointInsideConvexPolygon = polygon => {
  const point = getRandomPoint();
  if (isPointInsideConvexPolygon(point, polygon)) {
    return point;
  }
  return getRandomPointInsideConvexPolygon(polygon);
};
const getRandomPointsInsideConvexPolygon = (n, polygon) => {
  return Array(n).fill(null).map(item => getRandomPointInsideConvexPolygon(polygon));
};
const getConvexShell = points => {
  const convexShell = [];
  // bottom right point;
  const p0 = points.reduce((acc, item) => {
    if (item.y > acc.y) {
      return item;
    }
    if (item.y === acc.y) {
      if (item.x > acc.x) {
        return item;
      }
    }
    return acc;
  });
  convexShell.push(p0);

  const p1 = points.reduce((acc, point) => {
    return isPointToTheRightOfLine(point, p0, acc) ? point : acc;
  }, points[0] === p0 ? points[1] : points[0]);
  points = points.filter(point => point !== p1);
  convexShell.push(p1);
  let lastPoint = p1;
  do {
    let index;
    const rightPoint = points.reduce((acc, point, i) => {
      if (isPointToTheRightOfLine(point, lastPoint, acc)) {
        index = i;
        return point;
      } else {
        return acc;
      }
    });
    points.splice(index, 1);
    convexShell.push(rightPoint);
    lastPoint = rightPoint;
  } while (lastPoint !== p0);
  return convexShell;
};
const getDiameter = (points, isConvexHull = false) => {
  const shell = isConvexHull ? points : convexShell(points);
  shell.pop();
  const getPoint = index => shell[index];
  let resPair;
  let maxLength = 0;
  for (let i = 0; i < shell.length; i++) {
    for (let j = i + 1; j < shell.length; j++) {
      if (getLength(getPoint(i), getPoint(j)) > maxLength) {
        maxLength = getLength(getPoint(i), getPoint(j));
        resPair = [i, j];
      }
    }
  }

  return {
    value: maxLength,
    points: [ getPoint(resPair[0]), getPoint(resPair[1]) ]
  }
};
const getLength = (point1, point2) => {
  return ((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2) ** 0.5;
};