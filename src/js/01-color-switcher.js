function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', startClick);
stopBtn.addEventListener('click', stopClick);

let timerId = 0;

stopBtn.disabled = true;
function startClick() {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    
     startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stopClick() {
    clearInterval(timerId);
     startBtn.disabled = false;
    stopBtn.disabled = true;

}

