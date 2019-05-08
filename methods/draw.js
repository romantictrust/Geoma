const drawLine = (point1, point2, color) => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  showCoords(point2);
  ctx.lineTo(point2.x, point2.y);
  ctx.stroke();
  ctx.strokeStyle = '#000';
};
const drawPoint = (point, flag = true, color = '#000') => {
  ctx.beginPath();
  if (flag)
  showCoords(point);
  ctx.arc(point.x, point.y, 3, 0, 0.1 * Math.PI, true);
  ctx.fillStyle = color;
  ctx.fill();
};
const drawPoints = (points, flag = true, color) => {
  points.forEach(point => drawPoint(point, flag, color));
}
const drawPolygon = (points, color = '#000') => {
  for (let i = 0; i < points.length; i++) {
    if (i === points.length - 1) drawLine(points[i], points[0], color);
    else drawLine(points[i], points[i + 1], color);
  }
};
const showCoords = point => {
  ctx.font = "15px serif";
  ctx.fillText(`${~~point.x},${~~point.y}`, point.x - 24, point.y - 7);
};

