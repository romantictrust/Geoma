const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const header = document.querySelectorAll(".header")[0];
const message = document.querySelectorAll(".message")[0];

childsRemover = (father) => {
    if (father.hasChildNodes())
    while (father.firstChild) {
        father.removeChild(father.firstChild);
    }
}

setInterface = (textNode) => {
    stopAnimate();
    childsRemover(header);
    childsRemover(message);
    header.appendChild(textNode);
    clearCtx();
}

clearCtx = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

stopAnimate = () => {
    for (var i = 1; i < 100; i++)
        window.clearInterval(i);
}

resolve = (messageL = emptyText) => {
    messageL = document.createTextNode(messageL);
    childsRemover(message);
    message.appendChild(messageL);
}

const emptyText = document.createTextNode("");