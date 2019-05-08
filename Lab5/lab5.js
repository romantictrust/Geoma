"use strict"

var task5length;

const textNodeL5 = document.createTextNode("Lab 5: Graham");

function task5() {
    const polygon = createConvexPolygon();
    const points = getRandomPointsInsideConvexPolygon(POINTS_AMOUNT, polygon).map(point => {
        const alfa = Math.random() * Math.PI * 2;
        point.vector = [ SPEED * Math.cos(alfa), SPEED * Math.sin(alfa) ];
        return point;
      });

    setInterface(textNodeL5);
        setInterval(()=> {grahamAnimateLength(polygon, points)}, 40);
}