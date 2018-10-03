var TOTAL_TIME = 30; // in seconds

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;
        if (--timer < 0) {
            timer = 0;
            console.log("Time ends!!");
        }
    }, 1000);
  }
  
  window.onload = function () {
    let total_time = TOTAL_TIME,
        display = document.querySelector('#time');
    startTimer(total_time, display);
  };