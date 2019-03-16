$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyAyGSMfQV8ocZUAuWjtoom7T4UbSsLjDNI",
    authDomain: "rps-multiplayer-387ef.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-387ef.firebaseio.com",
    projectId: "rps-multiplayer-387ef",
    storageBucket: "rps-multiplayer-387ef.appspot.com",
    messagingSenderId: "710419196274"
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  var playerOne;
  var playerTwo;
  var playerOneChoice;
  var playerTwoChoice;
  var playerOneWins = 0;
  var playerOneLosses = 0;
  var playerTwoWins = 0;
  var playerTwoLosses = 0;

  function selectPlayerOne() {
    playerOneWins = 0;
    playerOneLosses = 0;
    playerTwoWins = 0;
    playerTwoLosses = 0;

    database.ref().set({
      firstName: "",
      secondName: "",
      firstChoice: "",
      secondChoice: "",
      firstWins: 0,
      firstLosses: 0,
      secondWins: 0,
      secondLosses: 0
    });

    $("#player-two").empty();
    $("#gameboard").empty();
    $("#current-action").text("Player One, enter name to start");
    $("#player-one").html(
      "<form>Player One:<br><input type='text' id='p1Name'><br><input type='submit' value='Ready Player 1' id='pOneBtn'></form>");
    $("#pOneBtn").on("click", function (event) {
      event.preventDefault();
      playerOne = $("#p1Name").val();
      $("#p1Title").text(playerOne)

      database.ref().set({
        firstName: playerOne,
        secondName: "",
        firstChoice: "",
        secondChoice: "",
        firstWins: playerOneWins,
        firstLosses: playerOneLosses,
        secondWins: playerTwoWins,
        secondLosses: playerTwoLosses
      });

      database.ref().on("value", function (snapshot) {
        playerOne = snapshot.val().firstName;
      });
      selectPlayerTwo()
    });
  }

  function selectPlayerTwo() {
    $("#current-action").text("Player Two, enter name to start");
    $("#player-one").text("Waiting for Player Two to join.")
    $("#player-two").html(
      "<form>Player One:<br><input type='text' id='p2Name'><br><input type='submit' value='Ready Player 2' id='pTwoBtn'></form>");
    $("#pTwoBtn").on("click", function (event) {
      event.preventDefault();
      playerTwo = $("#p2Name").val();
      $("#p2Title").text(playerTwo)

      database.ref().set({
        firstName: playerOne,
        secondName: playerTwo,
        firstChoice: "",
        secondChoice: "",
        firstWins: playerOneWins,
        firstLosses: playerOneLosses,
        secondWins: playerTwoWins,
        secondLosses: playerTwoLosses
      });

      database.ref().on("value", function (snapshot) {
        playerTwo = snapshot.val().secondName;
      });
      playerOnePlays()
    });
  }

  function playerOnePlays() {
    $("#gameboard").empty();
    $("#current-action").text("Player One, Select Rock, Paper, or Scissors");
    $("#player-two").html("<p>Waiting for Player One</p>");
    $("#player-one").html("<button class='play1Buttons' value='rock'>Rock</button>");
    $("#player-one").append("<button class='play1Buttons' value='paper'>Paper</button>");
    $("#player-one").append("<button class='play1Buttons' value='scissors'>Scissors</button>");
    $(".play1Buttons").on("click", function () {
      playerOneChoice = $(this).val();

      database.ref().set({
        firstName: playerOne,
        secondName: playerTwo,
        firstChoice: playerOneChoice,
        secondChoice: "",
        firstWins: playerOneWins,
        firstLosses: playerOneLosses,
        secondWins: playerTwoWins,
        secondLosses: playerTwoLosses
      });

      database.ref().on("value", function (snapshot) {
        playerOneChoice = snapshot.val().firstChoice;
      });
      playerTwoPlays()
    });
  }

  function playerTwoPlays() {
    $("#current-action").text("Player Two, Select Rock, Paper, or Scissors");
    $("#player-one").html("<p>Waiting for Player Two</p>");
    $("#player-two").html("<button class='play2Buttons' value='rock'>Rock</button>");
    $("#player-two").append("<button class='play2Buttons' value='paper'>Paper</button>");
    $("#player-two").append("<button class='play2Buttons' value='scissors'>Scissors</button>");
    $(".play2Buttons").on("click", function () {
      playerTwoChoice = $(this).val();

      database.ref().set({
        firstName: playerOne,
        secondName: playerTwo,
        firstChoice: playerOneChoice,
        secondChoice: playerTwoChoice,
        firstWins: playerOneWins,
        firstLosses: playerOneLosses,
        secondWins: playerTwoWins,
        secondLosses: playerTwoLosses
      });

      database.ref().on("value", function (snapshot) {
        playerTwoChoice = snapshot.val().secondChoice;
      });
      results();
    });
  }

  function firstPlayerWins() {
    $("#player-one").html("<h4>You won!</h4>");
    $("#player-two").html("<h4>You lost</h4>");
    playerOneWins += 1
    playerTwoLosses += 1
    database.ref().set({
      firstName: playerOne,
      secondName: playerTwo,
      firstChoice: playerOneChoice,
      secondChoice: playerTwoChoice,
      firstWins: playerOneWins,
      firstLosses: playerOneLosses,
      secondWins: playerTwoWins,
      secondLosses: playerTwoLosses
    });
  }

  function secondPlayerWins() {
    $("#player-one").html("<h4>You lost</h4>");
    $("#player-two").html("<h4>You won!</h4>");
    playerTwoWins += 1
    playerOneLosses += 1
    database.ref().set({
      firstName: playerOne,
      secondName: playerTwo,
      firstChoice: playerOneChoice,
      secondChoice: playerTwoChoice,
      firstWins: playerOneWins,
      firstLosses: playerOneLosses,
      secondWins: playerTwoWins,
      secondLosses: playerTwoLosses
    });
  }

  function results() {
    $("#current-action").html("<button id='rematchBtn'>Rematch?</button>");
    $("#current-action").append("<button id='endMatchupBtn'>End Matchup</button>");
    $("current-action").html("<button>End MatchUp</button>");
    $("#gameboard").append("<p>" + playerOne + " Chose:</p><p><b>" + playerOneChoice + "</b></p><p>" + playerTwo + " Chose:</p><p><b>" + playerTwoChoice + "</b></p>");

    if (playerOneChoice === playerTwoChoice) {
      $("#player-one").html("<h4>It's a tie!</h4>");
      $("#player-two").html("<h4>It's a tie!</h4>");
    }
    else if (playerOneChoice === "rock") {
      if (playerTwoChoice === "scissors") {
        firstPlayerWins();
      }
      else {
        secondPlayerWins();
      }
    }
    else if (playerOneChoice === "paper") {
      if (playerTwoChoice === "rock") {
        firstPlayerWins();
      }
      else {
        secondPlayerWins();
      }
    }
    else {
      if (playerTwoChoice === "paper") {
        firstPlayerWins();
      }
      else {
        secondPlayerWins();
      }
    }
  }

  database.ref().on("value", function (snapshot) {
    playerOneWins = snapshot.val().firstWins;
    $("#p1-wins").text("Wins: " + snapshot.val());
  });
  database.ref().on("value", function (snapshot) {
    playerOneLosses = snapshot.val().firstLosses;
    $("#p1-losses").text("Losses: " + snapshot.val());
  });
  database.ref().on("value", function (snapshot) {
    playerTwoWins = snapshot.val().secondWins;
    $("#p2-wins").text("Wins: " + snapshot.val());
  });
  database.ref().on("value", function (snapshot) {
    playerTwoLosses = snapshot.val().secondLosses;
    $("#p2-losses").text("Losses: " + snapshot.val());
  });

  $(document).on("click", "#rematchBtn", function () { playerOnePlays() });
  $(document).on("click", "#endMatchupBtn", function () { selectPlayerOne() });

  selectPlayerOne();

});