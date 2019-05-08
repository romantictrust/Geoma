"use strict";

const textNodeL2 = document.createTextNode("Lab 2: Point in/out the polygon");

function task2() {
    setInterface(textNodeL2);
    const points = getRandomSimplePolygon(5);
    drawPolygon(points);
    const point = getRandomPoint(canvas.width - 100, canvas.height - 100);
    drawPoint(point);
    let messageL2 = isPointInsidePolygon(point, points) ? ("Point is inside") : ("Point is outside");
    resolve(messageL2);
}