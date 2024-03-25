var cardList = [
  "bfa",
  "overwatch",
  "boom",
  "monster",
  "naxx",
  "portal",
  "void",
  "wax",
  "wings",
  "wood",
];
var clickState = false;
var cardSet;
var board = [];
var rows = 4;
var columns = 5;
var timeLeft;
var gameState = true;
var count = 0;
var elem = document.getElementById("gameState");

var firstCard;
var secondCard;
var timerId;
shuffleCards();
/**
 * this function is used for choosing difficulty level
 */
function beginnerLvl() {
  if (clickState == false) {
    timeLeft = 90;
    startGame();
    clickState = true;
  }
}
function advancedLvl() {
  if (clickState == false) {
    timeLeft = 60;
    startGame();
    clickState = true;
  }
}
function proLvl() {
  if (clickState == false) {
    timeLeft = 30;
    startGame();
    clickState = true;
  }
}
/**
 * this function is called when user choosed difficulty
 */ 
function startGame() {
  timerId = setInterval(countdown, 1000);//set interval countdown of 1 second
  loadGame();
  countdown();
}
/**
 * this function is used for appending the rows and colums and create classlists
 */
function loadGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop(); 
      row.push(cardImg);
      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = cardImg + ".jpg";
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      document.getElementById("board").append(card);
    }
    board.push(row);
  }
  setTimeout(hideCards, 1000);
}
/**
 * this function is used for hiding all the cards
 */
function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "cardback.jpg";
    }
  }
}
/**
 * this function is used for shuffling cards every reload
 */
function shuffleCards() {
  cardSet = cardList.concat(cardList); // join two arrays into one to create two of the same cards
  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
}
/**
 * this function is used for locating the two selected cards source
 */
function selectCard() {
  if (this.src.includes("back") && gameState == true) {
    if (!firstCard) {
      firstCard = this;
      let cardLoc = firstCard.id.split("-"); // find the card location and converts it into Array
      let r = parseInt(cardLoc[0]);
      let c = parseInt(cardLoc[1]);
      firstCard.src = board[r][c] + ".jpg";
    } else if (!secondCard && this != firstCard) {
      secondCard = this;
      let cardLoc = secondCard.id.split("-");
      let r = parseInt(cardLoc[0]);
      let c = parseInt(cardLoc[1]);
      secondCard.src = board[r][c] + ".jpg";
      setTimeout(update, 1000);
    }
  }
}
/**
 * this function is used for updating after user selected two cards
 * this will check whether they are the same or not
 */
function update() {
  if (firstCard.src == secondCard.src) {
    count += 1; // add 1 if two cards are same
    document.getElementById("count").innerText = count;
    if(count == 10) {
      var parent = document.getElementById("countDown")
      parent.style.display = 'none';
      elem.innerHTML = "Congratulations You Won!" // win if the count equals to 10
      gameState = false; // set the game to inactive
    }
  }
  else { // flip the cards back if not same
    firstCard.src = "cardback.jpg";
    secondCard.src = "cardback.jpg";
  }
  firstCard = null;
  secondCard = null;
}
/**
 * this function is used for countdown Timer
 */
function countdown() {
  var elem = document.getElementById("countDown");
  if (timeLeft == -1) {
    clearTimeout(timerId); // clear the time out by calling the id to stop working
    gameOver();
  } else {
    elem.innerHTML = timeLeft + " seconds remaining";
    timeLeft--;
  }
}
function gameOver() {
  elem.innerHTML = "Game is Over Friend!";
  gameState = false;
}
function reset() {
  location.reload(); // reloads the entire page
}
