// Basic timers
let countdownWork;
let countdownRest;
// Flag for pause timers
let pause = false;

const timerDisplay = document.querySelector(".display-time-left");
const endTime = document.querySelector(".display-end-time");
const workTimeBtn = document.querySelector("button[name='start-timer']");
const pauseTimeBtn = document.querySelector("button[name='pause-timer']");
const inputWorkTime = document.querySelector("input[name='work']");
const inputRestTime = document.querySelector("input[name='rest']");
const body = document.querySelector("body");

// Check for positive numbers in inputs
function checkData(val) {
	if (val < 0) {
		inputWorkTime.value= "0";
		return 0;
	} else {
		return val;
	}
}

// Apply a style based on the timer
function applyStyle(timer) {
	if (timer === "work") {
		body.style.background = "linear-gradient(45deg, #42A5F5 0%, #478ED1 50%, #0D47A1 100%)";
		endTime.textContent = "Work Time";
	} else {
		body.style.background = "linear-gradient(to top, #56AB2F, #A8E063)";
		endTime.textContent = "Rest Time";
	}
}

// Start session length timer
function timerWorkTime() {
	let secondsWork = checkData(inputWorkTime.value * 60);
	const now = Date.now();
	const then = now + secondsWork * 1000;
	let secondsLeft = Math.round((then - now) / 1000);
	clearInterval(countdownWork);
	clearInterval(countdownRest);
	displayTimeLeft(secondsWork);
	applyStyle("work");
	countdownWork = setInterval(() => {
		if (!pause) {
			secondsLeft--;
			if (secondsLeft < 0) {
				timerRestTime();
				clearInterval(countdownWork);
				return;
			}
			displayTimeLeft(secondsLeft);
		}
	}, 1000);

}

// Start break length timer
function timerRestTime() {
	const secondsRest = checkData(inputRestTime.value * 60);
	const now = Date.now();
	const then = now + secondsRest * 1000;
	let secondsLeft = Math.round((then - now) / 1000);
	clearInterval(countdownWork);
	clearInterval(countdownRest);
	displayTimeLeft(secondsRest);
	applyStyle("rest");
	countdownRest = setInterval(() => {
		if (!pause) {
			secondsLeft--;
			if (secondsLeft < 0) {
				timerWorkTime();
				clearInterval(countdownRest);
				return;
			}
			displayTimeLeft(secondsLeft);
		}
	}, 1000);
}

// Pause timers
function pauseTimers() {
	pause = !pause;
	if (pause) {
		pauseTimeBtn.textContent = "Resume";
	} else {
		pauseTimeBtn.textContent = "Pause";
	}
}

// Show timer values
function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

workTimeBtn.addEventListener("click", (e) => {
	timerWorkTime();
	pause = true;
	pauseTimers();
});

pauseTimeBtn.addEventListener("click", (e) => {
	pauseTimers();
});
