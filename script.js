const randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const prevGuessDisplay = document.querySelector('#prevGuess');
const remainingGuessDisplay = document.querySelector('#remainingGuess');
const lowOrHigh = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    } else if (guess < 1 || guess > 100) {
        alert("Please enter a number between 1 and 100");
    } else {
        prevGuess.push(guess);
        displayGuess();
        if (numGuess === 10) {
            displayMessage(`Game Over! The random number was ${randomNumber}`);
            endGame();
        } else {
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`Congratulations! You guessed the correct number (${randomNumber}) in ${numGuess} attempts.`);
        endGame();
    } else {
        const hint = guess < randomNumber ? 'higher' : 'lower';
        displayMessage(`Try again! Your guess is too ${hint}.`);
        numGuess++;
        remainingGuessDisplay.textContent = 10 - numGuess;
    }
}

function displayMessage(message) {
    lowOrHigh.textContent = message;
}

function displayGuess() {
    prevGuessDisplay.textContent = prevGuess.join(', ');
}

function endGame() {
    // Disable the input field and submit button
    userInput.disabled = true;
    submit.disabled = true;
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Start New Game';
    restartButton.addEventListener('click', function() {
        location.reload();
    });
    startOver.appendChild(restartButton);
}
