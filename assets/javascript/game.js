// Set array of random words
var randomWord = ["random", "words", "will", "go", "here"];
// set starting variables

var numWin = 0;
var numLose = 0;
var isFinished = false; //game will restart when becomes true
var currentWord; //the current word in play
var maxNumberGuesses = 10;
var guessesRemaining = 0;
var guessedLetters = [];
var answerArray = []; // use "_" to replace letters with underscores

// start the game
function setup() {
    currentWord = randomWord[Math.floor(Math.random() * randomWord.length)];
    answerArray = []; 
    for (var i = 0; i < currentWord.length; i++) {
        answerArray[i] = "_";
    }

    guessesRemaining = maxNumberGuesses;
    lettersGuessed = [];
};

// update html
function updateText() {
    document.getElementById("winTotal").innerText = numWin;
    document.getElementById("lossTotal").innerText = numLose;
    document.getElementById("remainignGuesses").innerText  = guessesRemaining;
    document.getElementById("currentWord").innerText = currentWord;
    document.getElementById("lettersGuessed").innerText = guessedLetters;
    )
}

// What key is pressed

function checkLetter(letter) {
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        if (currentWord.indexOf(letter) === -1) {
            guessesRemaining--;
        } else {
            for (var i = 0; i < currentWord.length; i++) {
                if (letter === currentWord[i]) {
                    answerArray[i] = letter;
                }
            }
        }
    }
};