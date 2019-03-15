"use strict"
$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAyGSMfQV8ocZUAuWjtoom7T4UbSsLjDNI",
    authDomain: "rps-multiplayer-387ef.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-387ef.firebaseio.com",
    projectId: "rps-multiplayer-387ef",
    storageBucket: "rps-multiplayer-387ef.appspot.com",
    messagingSenderId: "710419196274"
  };

  firebase.initializeApp(config);

  let playerOne;
  let playerTwo;
  let playerOneChoice;
  let playerTwoChoice;
  let playerOneWins = 0;
  let playerOneLosses = 0;
  let playerTwoWins = 0;
  let playerTwoLosses = 0;

  // if no players, obtain player one name
  function selectPlayerOne() {
    if (!playerOne) {
      $("#current-action").text("Player One, enter name to start");
      $("#player-one").html(
        "<form>Player One:<br><input type='text' id='p1Name'><br><input type='submit' value='Ready Player 1' id='pOneBtn'></form>");
      $("#pOneBtn").on("click", function (event) {
        event.preventDefault();
        playerOne = $("#p1Name").val();
        console.log("Player One: ", playerOne);

        // Push player one name to firebase

        selectPlayerTwo();
      });
    }
  }

  // if one player, obtain player two name
  function selectPlayerTwo() {
    if (playerOne && !playerTwo) {
      $("#current-action").text("Player Two, enter name to start");
      $("#player-one").text("Waiting for Player Two to join.")
      $("#player-two").html(
        "<form>Player One:<br><input type='text' id='p2Name'><br><input type='submit' value='Ready Player 2' id='pTwoBtn'></form>");
      $("#pTwoBtn").on("click", function (event) {
        event.preventDefault();
        playerTwo = $("#p2Name").val();
        console.log("Player Two: ", playerTwo);

        // push player two name to firebase

        playerOnePlays()
      });
    }
  }

  // give player one choice buttons, player two is waiting
  // store player one choice in firebase
  function playerOnePlays() {
    if (playerOne && playerTwo) {
      $("#gameboard").empty();
      $("#current-action").text("Player One, Select Rock, Paper, or Scissors");
      $("#player-two").html("<p>Waiting for Player One</p>");
      $("#player-one").html("<button class='play1Buttons' value='rock'>Rock</button>");
      $("#player-one").append("<button class='play1Buttons' value='paper'>Paper</button>");
      $("#player-one").append("<button class='play1Buttons' value='scissors'>Scissors</button>");
      $(".play1Buttons").on("click", function () {
        playerOneChoice = $(this).val();
        console.log("Player One Choice: ", playerOneChoice);

        // push player one choice to firebase

        playerTwoPlays();
      });
    }
  }

  // give player two choice buttons, player one is waiting
  // store player two choice in database
  function playerTwoPlays() {
    if (playerOneChoice) {
      $("#current-action").text("Player Two, Select Rock, Paper, or Scissors");
      $("#player-one").html("<p>Waiting for Player Two</p>");
      $("#player-two").html("<button class='play2Buttons' value='rock'>Rock</button>");
      $("#player-two").append("<button class='play2Buttons' value='paper'>Paper</button>");
      $("#player-two").append("<button class='play2Buttons' value='scissors'>Scissors</button>");
      $(".play2Buttons").on("click", function () {
        playerTwoChoice = $(this).val();
        console.log("Player Two Choice: ", playerTwoChoice);

        // push player two choice to firebase

        results();
      });
    }
  }

  // display player choices and result
  function results() {
    if (playerOneChoice && playerTwoChoice) {
      $("#current-action").html("<button id='rematchBtn'>Rematch?</button>");
      $("current-action").html("<button>End MatchUp</button>");
      // Add on click function to clear database and restart a new set of games
      $("#gameboard").append("<p>" + playerOne + " Chose:</p><p><b>" + playerOneChoice + "</b></p><p>" + playerTwo + " Chose:</p><p><b>" + playerTwoChoice + "</b></p>");
      // RPS game logic; show you win/you lose in player boxes & increase appropriate wins and losses
      if (playerOneChoice === playerTwoChoice) {
        $("#player-one").html("<h4>It's a tie!</h4>");
        $("#player-two").html("<h4>It's a tie!</h4>");
      }
      else if (playerOneChoice === "rock") {
        if (playerTwoChoice === "scissors") {
          $("#player-one").html("<h4>You won!</h4>");
          $("#player-two").html("<h4>You lost</h4>");
        }
        else {
          $("#player-one").html("<h4>You lost</h4>");
          $("#player-two").html("<h4>You won!</h4>");
        }
      }
      else if (playerOneChoice === "paper") {
        if (playerTwoChoice === "rock") {
          $("#player-one").html("<h4>You won!</h4>");
          $("#player-two").html("<h4>You lost</h4>");
        }
        else {
          $("#player-one").html("<h4>You lost</h4>");
          $("#player-two").html("<h4>You won!</h4>");
        }
      }
      else {
        if (playerTwoChoice === "paper") {
          $("#player-one").html("<h4>You won!</h4>");
          $("#player-two").html("<h4>You lost</h4>");
        }
        else {
          $("#player-one").html("<h4>You lost</h4>");
          $("#player-two").html("<h4>You won!</h4>");
        }
      }
    }
  }


$(document).on("click", "#rematchBtn", function(){playerOnePlays()});
  // on value change function to display wins and losses


  selectPlayerOne();

});