// Basic timers
let countdownWork;
let countdownRest;
// Flag for pause timers
let pause = false;

// Elements
const timerDisplay = document.querySelector(".display-time-left");
const endTime = document.querySelector(".display-end-time");
const workTimeBtn = document.querySelector("button[name='start-timer']");
const pauseTimeBtn = document.querySelector("button[name='pause-timer']");
const inputWorkTime = document.querySelector("input[name='work']");
const inputRestTime = document.querySelector("input[name='rest']");
const body = document.querySelector("body");

// Audio files
const audioWorkTimer = new Audio("../sounds/audio-1.wav");
const audioRestTimer = new Audio("../sounds/audio-2.wav");

// Start session length timer
function timerWorkTime() {
	let secondsWork = checkData(inputWorkTime.value * 60);
	clearInterval(countdownWork);
	clearInterval(countdownRest);
	displayTimeLeft(secondsWork);
	applyStyle("work");
	countdownWork = setInterval(() => {
		if (!pause) {
			secondsWork--;
			if (secondsWork < 0) {
				timerRestTime();
				clearInterval(countdownWork);
				return;
			}
			displayTimeLeft(secondsWork);
		}
	}, 1000);
}

// Start break length timer
function timerRestTime() {
	let secondsRest = checkData(inputRestTime.value * 60);
	clearInterval(countdownWork);
	clearInterval(countdownRest);
	displayTimeLeft(secondsRest);
	applyStyle("rest");
	countdownRest = setInterval(() => {
		if (!pause ) {
			secondsRest--;
			if (secondsRest < 0) {
				timerWorkTime();
				clearInterval(countdownRest);
				return;
			}
			displayTimeLeft(secondsRest);
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
		audioWorkTimer.currenTime = 0;
		audioWorkTimer.play();
	} else {
		body.style.background = "linear-gradient(to top, #56AB2F, #A8E063)";
		endTime.textContent = "Rest Time";
		audioRestTimer.currenTime = 0;
		audioRestTimer.play();
	}
}

workTimeBtn.addEventListener("click", () => {
	if (inputWorkTime.value !== "0" || inputRestTime.value !== "0") {
		timerWorkTime();
		pause = true;
		pauseTimers();
	}
});

pauseTimeBtn.addEventListener("click", () => {
	pauseTimers();
});
