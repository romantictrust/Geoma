"use strict"

const textNodeL4 = document.createTextNode("Lab 4: Graham algorithm");
const messageL4 = document.createTextNode("");

function task4() {
    setInterface(textNodeL4);
    let points = getRandomPoints(15);
    drawPoints(points);
    grahamScanning(points);
}