"use strict";

const textNodeL3 = document.createTextNode(
  "Lab 3: Moving points between polygons untill they stop"
);

const SHEEPS_AMOUNT = 10;
const UPDATE_TIME = 20;

function task3() {
  setInterface(textNodeL3);
  let sheeps = generateSheeps(SHEEPS_AMOUNT);
  setInterval(() => {
    if(sheeps.length == 0)
    resolve(`Done: All ${SHEEPS_AMOUNT} sheeps collected`);
  
    clearCtx();
    drawField();
    sheeps.forEach(ship => drawPoint(ship.point, false));
    sheeps = updateSheeps(sheeps);
  }, UPDATE_TIME);
}
