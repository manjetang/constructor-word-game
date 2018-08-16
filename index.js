var Word = require("./word.js");
var inquirer = require("inquirer");
var askName = require('inquirer-npm-name');

// Letter entry
var letterArray = "abcdefghijklmnopqrstuvwxyz";

//Words to choose from
var AfricanCountries = ["algeria", "angola", "benin", "botswana", "burkina faso", "burundi", "carbo verde", "cameroon", "central african republic", "chad", "comoros", "democratic republic of congo", "cote d'ivoire", "djibouti", "egypt", "equatorial guinea", "eritrea", "eswatini", "ethiopia", "gabon", "gambia", "ghana", "guinea", "guinea-bissau", "kenya", "lesotho", "liberia", "libya", "madagascar", "malawi", "mali", "mauritania", "mauritius", "morocco", "mozambique", "namibia", "niger", "nigeria", "rwanda", "sao tome and principe", "senegal", "seychelles", "sierra leone", "somalia", "south africa", "south sudan", "sudan", "tanzania", "togo", "tunisia", "uganda", "zambia", "zimbabwe"];

//Index from AfricanCountries array at random
var randomIndex = Math.floor(Math.random() * AfricanCountries.length);
var randomWord = AfricanCountries[randomIndex];

//Random word through Word constructor
computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses Remaining
var guessesLeft = 10;

function knowledge() {

    // Generates new word for constructor if true
    if (requireNewWord) {
        // Select AfricanCountries at random array
        var randomIndex = Math.floor(Math.random() * AfricanCountries.length);
        var randomWord = AfricanCountries[randomIndex];

        //Random word passed through the Word constructor
        computerWord = new Word(randomWord);

        
        requireNewWord = false;
    }


    //If letter guessed is correct test
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    // Letters that are remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {

               
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    knowledge();
                } else {

                   
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        knowledge();
                    } else {

                        // Verify if guess is correct
                        var wordCheckArray = [];

                        
                        computerWord.userGuess(input.userinput);

                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }

                        
                        computerWord.log();

                        // Print guesses remaining
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print the letters guessed so far
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        // Remaining Guesses 
                        if (guessesLeft > 0) {
                            // Call function 
                            knowledge();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }


                        
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

   
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                knowledge();
            } else {
                return
            }
        })
}

knowledge();
