/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guess remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
    window.location.reload();    
    }
});
//listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);
//validate
if(isNaN(guess) || guess < min || guess > max){
    setMessage(`please enter a number between ${min} and ${max}`, 'red');
}
//check if won
if(guess === winningNum){
gameOver(true, `${winningNum} is correct! You WIN!!!!`)
} else {
//Wrong number
guessesLeft -= 1;

if(guessesLeft === 0){
    //Game Over - lost
gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
} else {
//game continues - wrong answer

//Change border color
guessInput.style.borderColor = 'red';
// clear Input
guessInput.value = "";
setMessage(`${guess} is wrong. ${guessesLeft} guesses left `, 'purple');
}
}
});

//game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//winning Number
function getWinningNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
