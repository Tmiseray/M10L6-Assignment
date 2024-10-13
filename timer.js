


setInterval(function() {
    const tickMessage = document.getElementById("tickMessage");
    const currentTime = new Date();
    const timeString = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    tickMessage.textContent = "Tick... Current Time: " + timeString;
    console.log("Tick... Current Time: " + timeString);
}, 1000);