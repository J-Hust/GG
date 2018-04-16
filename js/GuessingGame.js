// TODO:
//     1) keep Go button next to submission when resizing browser window

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.diff = 0;
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber
};

Game.prototype.playersGuessSubmission = function(guess) {
  if (guess < 1 || guess > 100 || isNaN(guess)) {
    console.log('guess is ' + guess);
    throw new Error('That is an invalid guess.');
  } else {
    this.playersGuess = guess;
    this.diff = this.difference();
    return this.checkGuess();
  }
};

Game.prototype.checkGuess = function() {
  //check for win or duplicate
  if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
    return 'You have already guessed that number.';
  }
  if (this.diff === 0) {
    $('#hint, #submit').prop('disabled', true);
    $('#subtitle span').text('Press the Reset button to play again!')
    return 'You Win!';
  }

  //add guess to array
  else {
    this.pastGuesses.push(this.playersGuess);
    $('#guess-list li:nth-child(' + this.pastGuesses.length + ')').text(
      this.playersGuess
    );
  }
  if (this.pastGuesses.length === 5) {
    return 'You Lose.';
  }

  // //check closeness of guess
  if (this.diff < 10) {
    return "You're burning up!";
  } else if (this.diff < 25) {
    return "You're lukewarm.";
  } else if (this.diff < 50) {
    return "You're a bit chilly.";
  } else if (this.diff < 100) {
    return "You're ice cold!";
  }
};

function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr) {
  var m = arr.length,
    t,
    i;

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

function newGame() {
  return new Game();
}

Game.prototype.provideHint = function() {
  var hintArray = [];

  hintArray.push(this.winningNumber);
  hintArray.push(generateWinningNumber());
  hintArray.push(generateWinningNumber());

  shuffle(hintArray);

  return hintArray;
};

//event handlers
function makeAGuess(game) {
  var guess = $('#players-input').val();
  $('#players-input').val('');
  var output = game.playersGuessSubmission(parseInt(guess, 10));
  $('#title span').html(output);
}

$(document).ready(function() {
  var game = new Game();

  $('#submit').click(function(e) {
    makeAGuess(game);
  });

  $('#player-input').keypress(function(event) {
    if (event.which === 13) {
      makeAGuess(game);
    }
  });

  $('#hint').click(function() {
    var hints = game.provideHint();
    $('#subtitle span').html(
        'The winning number is ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2]
    );
  });

  $('#reset').click(function() {
    console.log('hi');
    game = newGame();
    $('#title span').html('Guessing Game!');
    $('#subtitle span').html('Guess a number between 1 and 100');
    $('.guess').html('_');
    $('#hint, #submit').prop('disabled', false);
  });
});
