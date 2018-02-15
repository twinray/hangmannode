var letter = require('./hangman.js');
var Word = function(word) {
	this.word = word;
	this.lets = [];
	this.found = false;
	this.getLets = function(word) {
		for (var i = 0; i < this.word.length; i++) {
			this.lets.push(new letter.Letter(this.word[i]);
		}
    };
    //copy and paste 
	this.foundTheWord = function() {
		var count = 0;
		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].appear) {
				count++;
			}
		}};
		if (count === this.lets.length) {
			this.found = true;
		}
		return this.found;
	};
	this.checkIfLetterFound = function(guessLetter) {
		var whatToReturn = 0;
		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].charac === guessLetter) {
				this.lets[i].appear = true;
				whatToReturn++;
			}
		}
		return whatToReturn;
	};
	this.wordRender = function() {
		var str = "???";
		
		for (var i = 0; i < this.lets.length; i++) {
			str += this.lets[i].letterRender();
		}
		return str;
	};
};

exports.Word = Word;