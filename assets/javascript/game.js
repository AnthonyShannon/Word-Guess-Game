var userGuess = document.getElementById("userGuess"); 
var userAnswer = document.getElementById("userAnswer");
var userWins = document.getElementById("win"); 
var userLoss = document.getElementById("lose"); 
var userTries = document.getElementById("tries"); 
var instructions = document.getElementById("instructions");
var message = document.getElementById("message");
var keyHit = document.getElementById("key");


var guessGame = {
    
    winCount: 0,
    loseCount: 0,
    triesLeft: 10,
    guitarBrands: ['MARTIN', 'GIBSON', 'FENDER', 'TAYLOR', 'IBANEZ', 'JACKSON', 'BREEDLOVE', 'GRETSCH' , 'PAUL REED SMITH', 'TAKAMINE'], 
    
    answers: "",
    imageSrc: "",
    displayWord: [],
    rightGuess: [], 
    wrongGuess: [], 

    gameStart: false,

    gameReset: function() {
        this.triesLeft = 10;
        this.wrongGuess = [];
        this.rightGuess = [];
        this.displayWord = [];

        var ranNum = Math.floor(Math.random() * this.guitarBrands.length)
        this.answers = this.guitarBrands[ranNum];
        
        this.displayWordBlank();

        userGuess.textContent = "You already guessed: ";
        message.textContent = "Which guitar do you play?";
        userTries.textContent = this.triesLeft;
        keyHit.value = ""; 
    },

    pastGuess: function(letter, state) {
        
        if (state == 1){
            this.rightGuess.push(letter);
        }
        else if (state == 2){
            this.wrongGuess.push(letter);
        }
    },

    displayWordBlank: function() {
        for (i=0; i<this.answers.length; i++){
            if (isAlpha(this.answers.charCodeAt(i))){
                this.displayWord.push('_');
            }
            else{
                this.displayWord.push(this.answers[i]);
            }
        }
        userAnswer.textContent = "";
        for (ctr=0; ctr<this.displayWord.length; ctr++){
            userAnswer.textContent += (this.displayWord[ctr] + "\xa0"); 
        }
    },
};

function isAlpha(keyCode){
    return ((keyCode >= 65 && keyCode <= 90));
}

function isInWord(letter){
    return (guessGame.answers.indexOf(letter) != -1);
}

function checkAnswer(){
    var inputWord = "";
    for (i=0; i<guessGame.displayWord.length; i++){
        inputWord += guessGame.displayWord[i];
    }
    return (inputWord == guessGame.answers);
}
function replaceBlank(letter){
    for (i=0; i<guessGame.displayWord.length; i++){
        if (letter == guessGame.answers[i]){
            guessGame.displayWord[i] = letter;
        }
    }
    userAnswer.textContent = "";
    for (ctr=0; ctr<guessGame.displayWord.length; ctr++){
        userAnswer.textContent += (guessGame.displayWord[ctr] + "\xa0"); 
    } 
}


document.onkeyup = function(event){
    if (guessGame.gameStart == false){
        guessGame.gameStart = true;
        instructions.textContent = "Please enter a letter";
        guessGame.gameReset();
    }
    else if(checkAnswer()){
        guessGame.gameReset();
        instructions.textContent = "Please enter a letter";
    }
    else if (guessGame.triesLeft > 0){
        var userInput;
        var inputCode;
        if (keyHit.value!=""){
            userInput = keyHit.value;
            inputCode = userInput.charCodeAt(0);
            keyHit.value = ""; 
        }
        else{
            userInput = event.key;
            inputCode = event.keyCode;
        }
        if(isAlpha(inputCode)){
            var inputUpper = userInput.toUpperCase();
            if (isInWord(inputUpper) && (guessGame.rightGuess.indexOf(inputUpper)==-1)){
                guessGame.pastGuess(inputUpper, 1);
                replaceBlank(inputUpper);
                
                if(checkAnswer()){
                    guessGame.winCount++;
                    userWins.textContent = guessGame.winCount;
                    message.textContent = "You Got it !";
                    instructions.textContent = "Enter any key to continue";
                }
            }
            else if ((guessGame.wrongGuess.indexOf(inputUpper)==-1) && (guessGame.rightGuess.indexOf(inputUpper)==-1)){
                guessGame.pastGuess(inputUpper, 2);
                guessGame.triesLeft--;

                if(guessGame.triesLeft == 0){
                    instructions.textContent = "Enter any key to continue";
                    message.textContent = "The Answer was: " + guessGame.answers;
                }
                userGuess.textContent += (inputUpper + "\xa0");
                userTries.textContent = guessGame.triesLeft;
            }
        }
        else{
            alert("Only press letters!");
            keyHit.value = "";
        }

    }
    else{
        guessGame.gameReset();
        guessGame.loseCount++;
        userLoss.textContent = guessGame.loseCount;
    }
}