// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    console.log(guess);

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`You must enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct! You win!`)
    } else {
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game is over
            gameOver(false, `Game over! The correct number was ${winningNum}`)
        } else {
            // Wrong answer but have guesses remaining
            guessInput.value = '';
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is incorrect! You have ${guessesLeft} remaining!`, 'red');
        }
    }
});

function gameOver(won, message) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(message, color);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}