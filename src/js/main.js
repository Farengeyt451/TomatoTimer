let countdownWork;
let countdownRest;
let pause = false;

const timerDisplay = document.querySelector(".display-time-left");
const endTime = document.querySelector(".display-end-time");
const workTimeBtn = document.querySelector("button[name='start-timer']");
const pauseTimeBtn = document.querySelector("button[name='pause-timer']");
const inputWorkTime = document.querySelector("input[name='work']");
const inputRestTime = document.querySelector("input[name='rest']");
const body = document.querySelector("body");

function checkData(val) {
	if (val < 0) {
		console.log("<0");
		inputWorkTime.value= "0";
		return 0;
	} else {
		return val;
	}
}

function timerWorkTime() {
	let secondsWork = checkData(inputWorkTime.value * 60);
	const now = Date.now();
	const then = now + secondsWork * 1000;
	let secondsLeft = Math.round((then - now) / 1000);
	clearInterval(countdownWork);
	clearInterval(countdownRest);
	displayTimeLeft(secondsWork);
	body.style.background = "linear-gradient(45deg, #42A5F5 0%, #478ED1 50%, #0D47A1 100%)";
	endTime.textContent = "Work Time";
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

function timerRestTime() {
	const secondsRest = inputRestTime.value * 60;
	const now = Date.now();
	const then = now + secondsRest * 1000;
	let secondsLeft = Math.round((then - now) / 1000);
	clearInterval(countdownWork);
	clearInterval(countdownRest);
	displayTimeLeft(secondsRest);
	body.style.background = "linear-gradient(to top, #56AB2F, #A8E063)";
	endTime.textContent = "Rest Time";
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

function pauseTimers() {
	pause = !pause;
	if (pause) {
		pauseTimeBtn.textContent = "Resume";
	} else {
		pauseTimeBtn.textContent = "Pause";
	}
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

workTimeBtn.addEventListener("click", (e) => {
	e.preventDefault();
	timerWorkTime();
	pause = true;
	pauseTimers();
});

pauseTimeBtn.addEventListener("click", (e) => {
	e.preventDefault();
	pauseTimers();
});

	let counted = 25;
inputWorkTime.addEventListener("wheel", debounce(changeMins, 100));

function changeMins(e){
	console.log(e);
	if (e.deltaY < 0) {
		counted++;
	} else {
		counted--;
	}
	inputWorkTime.value = counted;
	console.log(counted);
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
