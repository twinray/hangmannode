
// set prompts for user// these go to other files. 
// need to test again, find errors,
// need to try and download Jason again
//

var prompt = require('prompt');
var Word = require('./word.js');
var wordGroup = require('./wordGroup.js');

prompt.start();


game = {
	wordGroup : Game.wordGroup,
	wordsWon : 0,
	guessesRemaining : 10,
	guessedLetters: [],
	currentWrd : null,
	startGame : function(wrd) {
		this.resetGuessesRemaining();
		this.currentWrd = new Word.Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
		this.currentWrd.getLets();
		console.log("Welcome to Hangman! These words are inspired by the San Diego Zoo");
		console.log(this.currentWrd.wordRender() + '\n');
		this.keepPromptingUser();
	},
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;
		prompt.get(['guessLetter'], function(err, result) {
				console.log("");
		    console.log('The letter you guessed is: ' + result.guessLetter);

		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

		    if (findHowManyOfUserGuess === 0) {
					if (self.guessedLetters.indexOf(result.guessLetter) < 0) {
            	self.guessedLetters.push(result.guessLetter);
            	self.guessesRemaining--;
            	console.log("You guessed a wrong letter!");
          } else {
            	console.log("You've already guessed this letter!");
          }
		    } else {
			    	if (self.guessedLetters.indexOf(result.guessLetter) < 0) {
	    				self.guessedLetters.push(result.guessLetter);
				    	console.log('You guessed right!');
				    } else {
				    	console.log('Already guessed that letter');
				    }
		    		if (self.currentWrd.foundTheWord()) {
				    	console.log('You Won! ' + self.currentWrd.word);
							console.log('WAY TO GO! Now go visit the Zoo!');
				    	return;
				    }
			    }

		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
				console.log("");
		    console.log('Letters already guessed: ' + self.guessedLetters);


		    if ((self.guessesRemaining > 0) && (self.currentWrd.found === false)){
		    	self.keepPromptingUser();
		    } else if(self.guessesRemaining === 0){
			    	console.log('You lost! Go study your animals at the zoo', self.currentWrd.word);
			    
			  } else{
			    	console.log(self.currentWrd.wordRender());
			  }
		});
	}
};

game.startGame();