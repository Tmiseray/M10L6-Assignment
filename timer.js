
function padZero(num) {
    return num.toString().padStart(2, '0');
}

setInterval(function() {
    const curTimeText = document.getElementById("curTimeText");
    const timeText = document.getElementById("timeText");

    const currentTime = new Date();
    const timeString = padZero(currentTime.getHours()) + ":" + padZero(currentTime.getMinutes()) + ":" + padZero(currentTime.getSeconds());

    curTimeText.textContent = "Current Time:";
    timeText.textContent = timeString;
    console.log("Tick... Current Time: " + timeString);
}, 1000);

let timers = [];

document.getElementById('timerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const timerLabel = document.getElementById('timerLabel').value;
    const timerDuration = parseInt(document.getElementById('timerDuration').value, 10);

    const timerList = document.getElementById('timerList');
    const timerLabelItem = document.createElement('li');
    timerLabelItem.textContent = timerLabel;

    const space = document.createElement('br');
    const countdownItem = document.createElement('span');
    countdownItem.classList.add('countdownItem');
    countdownItem.textContent = timerDuration;
    timerLabelItem.appendChild(space);
    timerLabelItem.appendChild(countdownItem);
    timerList.appendChild(timerLabelItem);

    startCountdown(countdownItem, timerLabel, timerDuration);
});

function startCountdown(countdownElement, label, duration) {
    let timeLeft = duration;
    const timerList = document.getElementById('timerList');
    const timerLabelItem = countdownElement.parentNode;

    const interval = setInterval(function () {
        timeLeft--;
        countdownElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            showDialog(label);
            timerList.removeChild(timerLabelItem);
        }
    }, 1000);
}

function showDialog(label) {
    const userResponse = confirm(`Timer "${label}" is over! Do you want to repeat it? Click "Ok" to reset the timer duration or to dismiss the timer.`);
    if (userResponse) {
        const timerDuration = parseInt(prompt("Click cancel to dismiss the timer or Enter duration in seconds below:"), 10);
        if (!isNaN(timerDuration) && timerDuration > 0) {
            const space = document.createElement('br');
            const countdownElement = document.createElement('span');
            countdownElement.classList.add('countdownItem');
            countdownElement.textContent = timerDuration;

            const timerList = document.getElementById('timerList');
            const newTimerLabelItem = document.createElement('li');
            newTimerLabelItem.textContent = label;

            newTimerLabelItem.appendChild(space);
            newTimerLabelItem.appendChild(countdownElement);
            timerList.appendChild(newTimerLabelItem);

            startCountdown(countdownElement, label, timerDuration);
        }
    } else {
        setTimeout(() => {
            alert(`Timer "${label}" is still over!`);
            showDialog(label);
        }, 10000);
    }
}