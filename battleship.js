//Initialize global variables
var torpedoesLeft = 25;
var board = [ [], [], [] , [], [], [], [], [], [], [], [] ];
var hitScore = 0;
var wins = 0;
var losses = 0;

//Define nothing, hits, ships and misses
var HIT = 1;
var MISS = -1;
var SHIP = 0;
var NOTHING = undefined;

// Checks if number is 0 to not create negative number
function ifZero(int) {
  if (int > 0) {
    return int;
  }
  else
    return 1;
  }

// Adds a five block ship
function addShipsFive() {
      var j = Math.floor(Math.random()*10);
      var k = Math.floor(Math.random()*6);
      var oneShip = 0;
      console.log(k);
      while (oneShip < 1) {
      console.log("" + j + k);
          if ((board[j][k] != SHIP) && (board[j+1][k] != SHIP) && (board[j][k+1] != SHIP) && (board[ifZero(j) - 1 ][k] != SHIP) && (board[j][ifZero(k) - 1] != SHIP)) {
              for (var five = 0; five < 5; five++) {
                board[j][k + five]= SHIP;
                console.log("increment");
              }
              shipsPlaced++;
              oneShip = oneShip + 1;
            }


    };
}

// Adds a one block ship
function addShipsOne() {
        var place = 0;
        var j = Math.floor(Math.random()*10);
        var k = Math.floor(Math.random()*10);
        console.log("" + j + k);
        while (place < 1 && (board[j][k] != SHIP)) {
          if ((board[j+1][k] != SHIP) && (board[j][k+1] != SHIP) && (board[ifZero(j) - 1 ][k] != SHIP) && (board[j][ifZero(k) - 1] != SHIP)) {
            board[j][k] = SHIP;
            shipsPlaced++;
            place = place + 1;
          }
          else {
            k = Math.floor(Math.random()*10);
          }
      }
    };

//Adds a four block ship
  function addShipsFour() {
        var j = Math.floor(Math.random()*10);
        var k = Math.floor(Math.random()*10);
        console.log("" + j + k);
        var oneShip = 0;
        while (oneShip < 1) {
        if ((board[j][k] != SHIP) && (board[j+4][k] != SHIP) && (board[j][k+1] != SHIP) && (board[ifZero(j) - 1 ][k] != SHIP) && (board[j][ifZero(k) - 1] != SHIP)) {
          if (k >= 0 && k < 7) {
            for (var four = 0; four < 4; four++) {
              board[j][k + four]= SHIP;
                oneShip = oneShip + 1;
            }
            shipsPlaced++;
          }
          else {
              k = Math.floor(Math.random()*10);
          }
        }
      };
}
//Add 5 random ships
var shipsPlaced = 0;
//
// function addShips () {
//   while (shipsPlaced < 4) {
    // addShipsFour();
    // addShipsFour();
    addShipsOne();
    addShipsFive();
//     console.log(shipsPlaced);
//   }
//
// }
//
// addShips();

//Reset the variables and UI for new games
function reset() {
  torpedoesLeft = 25;
  hitScore = 0;
  board = [ [], [], [] , [], [], [], [], [], [], [], [] ];
  for (var i = 0; i<5; i++) {
    board[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)] = SHIP;
  }
  $("td").removeClass("red");
  $("td").removeClass("orange");
  $("#subheader").text("Good luck.");
  $("#message").text("Torpedoes Available: 25");
  $("#resetBtn").hide();
}

//Checks if the game is won
function checkLoss() {
  if (torpedoesLeft === 0) { //Use all torpedoes = lose
    losses = losses + 1;
    $("#scoreLoss").text(losses);
    $("#message").text("You Lose!");
    $("#resetBtn").show();
    reveal();
  }
};

//Function to show ships if game is lost
 function reveal() {
   for (var x = 0; x < 10; x++) {
     for (var y = 0; y < 10; y++) {
       if (board[x][y] === SHIP) {
         $("#"+x+y).addClass("orange");
       }
     }
   }
 }


$(document).ready(function(){
  //Hide reset button
  $("#resetBtn").hide();

  //Table
  for (var row = 0; row < 10; row++) { //Creates table rows
      var insert = $("#gameboard").append("<tr></tr>");

    for (var data = 0; data < 10; data++) { //Populates table with data and ID
      insert.append('<td id="' + row + data + '">' + board[row][data] + '</td>');
    }

  } // Close of for loop

  $("#resetBtn").on("click", reset); //reset button calls reset function


  //Mouse over table data places an 'X'
  $("td").mouseover(function() {
    $(this).text("X");
  });

  //Mouse cursor moves out of table data replaces 'id'
  $("td").mouseout(function(){
    $(this).text($(this).attr("id"));
  });

  //listen for clicks
  $("td").on("click",
    function() {
        var x = parseInt($(this).attr("id").charAt(0));
        var y = parseInt($(this).attr("id").charAt(1));

      if (board[x][y] === NOTHING && torpedoesLeft > 0) { //Red if miss
        $(this).addClass("red");
        board[x][y] = MISS;
        torpedoesLeft--;
        $("#subheader").text("Miss!");
        $("#message").text("Torpedoes Available: " + torpedoesLeft);
        checkLoss();
      }

      if (board[x][y] === SHIP && torpedoesLeft > 0) { //Orange if hit
        $(this).addClass("orange");
        board[x][y] = HIT;
        hitScore++;
        torpedoesLeft--;
        $("#subheader").text("Hit!");
        $("#message").text("Torpedoes Available: " + torpedoesLeft);
        checkLoss();
      }

      if (hitScore === 5) //5 hits is a win
      {
        wins = wins + 1;
        $("#scoreWin").text(wins);
        $("#message").text("You Win!");
        $("#resetBtn").show();
      }

    }) //End click function


}); //Close document ready function
