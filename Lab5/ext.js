const SPEED = 2;
const MAX_LENGTH = 500;
const POINTS_AMOUNT = 7;

const grahamAnimateLength = (polygon, points) => {    
    clearCtx();
    drawPolygon(polygon, 'blue');
    drawPoints(points, false, '');
    const shell = getConvexShell(points);
    drawPolygon(shell);
    const { value, points: resPoints } = getDiameter(shell, true);
    drawLine(resPoints[0], resPoints[1], 'red');
    if (value > MAX_LENGTH) {
        stopAnimate();
        return;
      }
    resolve("Length: " + ~~value);
    updatePoints(points, polygon);
}