const copy = obj => JSON.parse(JSON.stringify(obj));

let changes = [];

const grahamScanning = (points) => {
    changes = [];
    const topPoint = points.reduce((acc, item) => item.y < acc.y ? item : acc);
    const pointsWithoutTop = points.filter(item => item !== topPoint);
    const sortedPointsWithoutTop = pointsWithoutTop.sort((a, b) => {
      return math.det(setMatrix(topPoint, a, b)) - math.det(setMatrix(topPoint, b, a));
    });
    const P = [ topPoint, ...sortedPointsWithoutTop ];
    const S = [ P[0], P[1] ];
    const nextToTop = () => S[S.length - 2] || top();
    const top = () => S[S.length - 1];
    changes.push(copy(S));
    for (let i = 1; i < sortedPointsWithoutTop.length; i++) {
      while (isPointToTheLeftOfLine(top(), nextToTop(), sortedPointsWithoutTop[i])) {
        S.push(sortedPointsWithoutTop[i]);
        changes.push(copy(S));
        S.pop();
        changes.push(copy(S));
        S.pop();
        changes.push(copy(S));
      }
      S.push(sortedPointsWithoutTop[i]);
      changes.push(copy(S));
    }
    grahamAnimate(points);
}