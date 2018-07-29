var colors = generateRandomColors(6);

const bgColor = "rgb(35, 35, 35)";
var squares = document.querySelectorAll(".square");
var goalColor = colors[randomNumber(6)];
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

colorDisplay.textContent = goalColor;

function newGame(n) {
	// generate new colors
	colors = generateRandomColors(n);

	// pick new random color from array
	goalColor = colors[randomNumber(n)];

	//change colorDisplay to match goal color
	colorDisplay.textContent = goalColor;

	// change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}

	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function() {
	newGame(colors.length);
});

easy.addEventListener("click", function() {
	this.classList.add("selected");
	hard.classList.remove("selected");

	newGame(3);
});

hard.addEventListener("click", function() {
	this.classList.add("selected");
	easy.classList.remove("selected");

	newGame(6);
});

for (var i = 0; i < squares.length; i++) {
	// add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	// add click listeners to squares
	squares[i].addEventListener("click", function() {
		// get color of clicked square
		var clickedCol = this.style.backgroundColor;

		// compare color to goalColor
		if (clickedCol === goalColor) {
			winAnimation();
			messageDisplay.textContent = "Correct!"
		} else {
			this.style.backgroundColor = bgColor;
			messageDisplay.textContent = "Try Again"
		}
	});
}

function winAnimation() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = goalColor;
	}
	h1.style.backgroundColor = goalColor;
	resetButton.textContent = "Play again?";
}

function randomNumber(n) {
	// random() always returns a number lower than 1, so n needs to be
	// one greater than number to
	return Math.floor(Math.random() * n);
}

function randomColor() {
	var retVal = "rgb(";
	retVal += String(randomNumber(256)) + ", ";
	retVal += String(randomNumber(256)) + ", ";
	retVal += String(randomNumber(256)) + ")";
	return retVal;
}

function generateRandomColors(n) {
	var retVal = new Array();
	for (var i = 0; i < n; i++) {
		retVal.push(randomColor());
	}
	return retVal;
}

/*
when i click on square, run some code that will figure out the color
of the square clicked, once we have that color, compare it with goal
color. if different then change the color of the picked square to same
color of site background. if it is correct, then player has won and we
run special code.
*/