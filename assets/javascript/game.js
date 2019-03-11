var randomWordArr = ["beer", "wine", "brewery", "pizza", "sushi", "steak", "burger"];

// choose random word from the array
var randomWord = randomWordArr[Math.floor(Math.random() * randomWordArr.length)];

// globals
var s;
var count = 0;
// empty array to store the guesses
var answerArray = [];

/* fill the answer array with underscores
the number of underscores matches the letters in the randomly chosen word */
function startUp() {
    for (var i = 0; i < randomWord.length; i++) {
        answerArray[i] = "_";
    }
    // put them in a string
    s = answerArray.join(" ");
    document.getElementById("answer").innerHTML = s;
}

function Letter() {
    var letter = document.getElementById("letter").nodeValue;

    if (letter.length > 0) {
        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === letter) {
                answerArray[i] = letter;
            }
        }
        // here is how many times it takes to guess
        count++;
        document.getElementById("counter").innerHTML = "No of clicks: " + count;
        document.getElementById("answer").innerHTML = answerArray.join(" ");
    }
    if (counts > 5) {
        document.getElementById("stat").innerHTML = "Come on... you should've guessed it by now!";
    }
}