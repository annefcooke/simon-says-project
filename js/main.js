$(document).ready(function(event) {

  //adding game as an object
  var game = {
  count: 0,
  optionsArray: ['#red','#green', '#yellow', '#blue'],
  compArray: [],
  playerArray: [],
  playerScore: 0,
  strict: false,
  }

  //start button click event
  $('.start-button').click(function() {
    newGame();
  })

  //new game resets level and scores and sequence array, and calls for new sequence.
  function newGame() {
    game.compArray = [];
    game.playerScore = 0;
    game.count = 0;
    game.count +=1;
    $('.level').html(game.count);
    $('.start-button').html(' ');
    generateSequence();
  }

  //Computer generates a random choice from the 4 options in the option array. This pushes the choice to the end of the current computer array. Then goes through each item in the array at set intervals until reaching end of the array.
  function generateSequence() {
    game.compArray.push(game.optionsArray[Math.floor(Math.random()*4)]);
    console.log(game.compArray);
    var i = 0;
    setInterval(function() {
      displayArray(game.compArray[i]);
      i+=1;
      if (i>=game.compArray.length) {
        clearInterval();
      }
    }, 500
    )
    game.playerArray = [];
  }

  //Adds and removes the class of 'chosen' to display the computer array.
  function displayArray(index) {
    $(index).addClass('chosen');
    setTimeout(function() {
      $(index).removeClass('chosen');
    }, 300
  )}

  //click event for the 4 game buttons. Pushes the id to the playerArray. Also adds and removes class of 'chosen'.
  $('.button').click(function() {
    var element = "#"+this.id;
    game.playerArray.push(element);
    playerTurn(this);
    $(this).addClass('chosen');
    setTimeout(function() {
      $('.button').removeClass('chosen');
    }, 100)
  })

  //Comparing computer array and player array. If player gets it wrong, it gives player the opportunity to play again from beginning. If play gets it right, either player wins if all levels complete, or move to next level (generates next sequence).
  function playerTurn(x) {
  if (game.playerArray[game.playerArray.length - 1] !== game.compArray[game.playerArray.length - 1]) {
      $('.start-button').html('Oops! You scored '+game.playerScore+ '.');
      setTimeout(function() {
        $('.start-button').html('Try Again');
      }, 2000)
    } else {
      if (game.playerArray.length === game.compArray.length) {
        game.playerScore += Math.pow(game.compArray.length,2);
        $('.score').html(game.playerScore);

        if(game.count == 5){
          $('.start-button').html('Complete! You scored the top score of '+game.playerScore+'!');
          setTimeout(function() {
            $('.start-button').html('New Game');
          }, 2000)
        } else {
          // $('.start-button').html('Next Level!');
          // nextLevel();
          game.count +=1;
          $('.level').html(game.count);
          $('.start-button').html(' ');
          generateSequence();
        }
      }
    }
  }

  // function nextLevel() {
  //   game.count +=1;
  //   $('.level').html(game.count);
  //   $('.start-button').html(' ');
  //   generateSequence();
  // }




  $('.instructions-button').click(function() {
    if ($('.instructions-button:contains("How ")')){
      $('.button-div').css('display', 'none');
      $('.instructions').css('display','unset').css("margin",'20%');
      $(this).html('<h2>Back to Game</h2>');
      $('.col').html(' ');
    }
    // else if ($('.instructions-button:contains("Back")')){
    //   // $('.button-div').css('display', 'block');
    //   // $('.instructions').css('display','none');
    //   $(this).html('<h2>How to Play</h2>');
    // }
  })


})