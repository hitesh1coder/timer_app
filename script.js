const hourBox = document.querySelector("#hour");
const minbox = document.querySelector("#min");
const secondBox = document.querySelector("#sec");

let totalTimeinSec = 0;
let hour = 0;
let min = 0;
let sec = 0;
let interval;

const updateOnPage = () => {
  hourBox.value = hour;
  minbox.value = min;
  secondBox.value = sec;
};

hourBox.addEventListener("change", () => {
  hour = parseInt(hourBox.value);
  updateOnPage();
});
minbox.addEventListener("change", () => {
  min = parseInt(minbox.value);
  if (min >= 60) {
    hour = Math.floor(hour + min / 60);
    min = min % 60;
  }
  updateOnPage();
});
secondBox.addEventListener("change", () => {
  sec = parseInt(secondBox.value);
  if (sec >= 60) {
    min = Math.floor(min + sec / 60);
    sec = sec % 60;
    if (min > 60) {
      hour = Math.floor(hour + min / 60);
      min = min % 60;
    }
  }
  updateOnPage();
});

const changeHMS = () => {
  sec = totalTimeinSec % 60;
  hour = Math.floor(min / 60);
  min = Math.floor(totalTimeinSec / 60);
  min = min % 60;
  updateOnPage();
};
const startTime = () => {
  totalTimeinSec = hour * 60 * 60 + min * 60 + sec;
  if (totalTimeinSec > 0) {
    interval = setInterval(() => {
      totalTimeinSec -= 1;
      if (totalTimeinSec < 0) {
        resetTime();
        clearInterval(interval);
      }
      changeHMS();
    }, 1000);
  } else {
    var audio = new Audio("bell sound.wav");
    audio.play();
    alert("Times Up");
    resetTime();
  }
};
const stopTimer = () => {
  clearInterval(interval);
};

const resetTime = () => {
  hour = 0;
  min = 0;
  sec = 0;
  totalTimeinSec = 0;
  hourBox.value = "00";
  minbox.value = "00";
  secondBox.value = "00";
};
