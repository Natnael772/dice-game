"use strict";

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];

//switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  //Toggle : adds if the class isnot present, and removes if the class is present
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  //1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display the generated dice
  diceEl.setAttribute("src", `dice-${dice}.png`);
  diceEl.classList.remove("hidden");
  // console.log(dice);
  //3. Check for rolled 1: if true, switch to  next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore = currentScore + dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch to next player
    switchPlayer();
  }
});
btnHold.addEventListener("click", function () {
  //1. Add current score to active player

  scores[activePlayer] = scores[activePlayer] + currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  console.log(activePlayer, scores[activePlayer]);
  currentScore = 0;

  //2. Check if player's score is >=50
  //if true, finish the game. Else, switch to the next player.
  if (scores[activePlayer] >= 50) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");

    console.log(`Player ${activePlayer + 1} wins the game`);
    diceEl.classList.add("hidden");
    btnHold.disabled = true;
    btnRoll.disabled = true;
  } else {
    switchPlayer();
  }
});
btnNew.addEventListener("click", function () {
  window.location.reload();
});

// How toggle actually works
// if (activePlayer == 1) {
//   document
//     .getElementById(`current--1`)
//     .parentElement.parentElement.classList.add("player--active");
//   document
//     .getElementById(`current--0`)
//     .parentElement.parentElement.classList.remove("player--active");
// } else {
//   document
//     .getElementById(`current--0`)
//     .parentElement.parentElement.classList.add("player--active");
//   document
//     .getElementById(`current--1`)
//     .parentElement.parentElement.classList.remove("player--active");
// }

// if (
//   document.querySelector(".player--0").classList.contains("player--active")
// ) {
//   document.querySelector(".player--0").classList.remove("player--active");
//   document.querySelector(".player--1").classList.add("player--active");
// } else if (
//   document.querySelector(".player--1").classList.contains("player--active")
// ) {
//   document.querySelector(".player--0").classList.add("player--active");
//   document.querySelector(".player--1").classList.remove("player--active");
// }

// let roll = document.querySelector(".btn--roll");
// roll.addEventListener("click", function () {
//   if (
//     document.querySelector(".player--0").classList.contains("player--active")
//   ) {
//     document.querySelector(".player--0").classList.remove("player--active");
//     document.querySelector(".player--1").classList.add("player--active");
//   } else if (
//     document.querySelector(".player--1").classList.contains("player--active")
//   ) {
//     document.querySelector(".player--0").classList.add("player--active");
//     document.querySelector(".player--1").classList.remove("player--active");
//   }
// });
