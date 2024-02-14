const timer = (dateStr) => {
    const dateEnd = new Date(dateStr);
    let spanDays = document.getElementById('days');
    let spanHours = document.getElementById('hours');
    let spanMinutes = document.getElementById('minutes');
    let spanSeconds = document.getElementById('seconds');
    let interval1 = setInterval(timerRander, 1000);

    function addZiro(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function timerRander() {
        const remainTime = dateEnd - new Date();
        if (remainTime < 0) {
            spanDays.textContent = "00";
            spanHours.textContent = "00";
            spanMinutes.textContent = "00";
            spanSeconds.textContent = "00";
            clearInterval(interval1);
        } else {
            spanDays.textContent = addZiro(Math.floor(remainTime / (1000 * 3600 * 24)));
            spanHours.textContent = addZiro(Math.floor(remainTime / (1000 * 3600) % 24));
            spanMinutes.textContent = addZiro(Math.floor(remainTime / (1000 * 60) % 60));
            spanSeconds.textContent = addZiro(Math.floor(remainTime / (1000) % 60));
        }
    }
    timerRander();
}
export { timer }