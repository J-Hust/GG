function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.diff = 0;
    this.winningNumber = generateWinningNumber();

}


Game.prototype.difference = function(){

    return Math.abs(this.playersGuess - this.winningNumber);
    
}

Game.prototype.isLower = function(){
    
    if (this.playersGuess < this.winningNumber){
        return true;
    }
    else {
        return false;
    }
}

Game.prototype.playersGuessSubmission = function(guess){
    
    if (guess < 1 || guess > 100 || isNaN(guess)){
        throw 'That is an invalid guess.'
    }
    else {
        
        this.playersGuess = guess;
        this.diff = this.difference();
        return this.checkGuess();
        
    }
    
}

Game.prototype.checkGuess = function(){
    
    
    //check for win or duplicate
    if (this.pastGuesses.indexOf(this.playersGuess) > -1){return 'You have already guessed that number.'}
    if (this.diff === 0){return 'You Win!'} else
    
    
    //add guess to array
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length === 5){
        return 'You Lose.'
    }
    
    // //check closeness of guess
    if (this.diff < 10){return 'You\'re burning up!'} else
    if (this.diff < 25){return 'You\'re lukewarm.'} else
    if (this.diff < 50){return 'You\'re a bit chilly.'} else
    if (this.diff < 100){return 'You\'re ice cold!'}
    
    
}


function generateWinningNumber(){
    
    return Math.floor(Math.random()*100+1);
    
}

function shuffle(arr) {
  var m = arr.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

function newGame(){
    
    return new Game();
    
}

Game.prototype.provideHint = function(){
    
    var hintArray = [];
    
    hintArray.push(this.winningNumber);
    hintArray.push(generateWinningNumber());
    hintArray.push(generateWinningNumber());
    
    shuffle(hintArray);
    
    return hintArray;
    
}


//event handlers
$('document').ready(function(){
    
    $('#submit').click(Game.prototype.playersGuessSubmission);
    
})