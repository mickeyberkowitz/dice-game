'use strict';

function setScore(scoreElement, newScore) {
  scoreElement.textContent = newScore;
}

function switchPlayer() {
  currentScore = 0;
  setScore(document.getElementById(`current--${activePlayer}`), currentScore);

  activePlayer = activePlayer > 0 ? 0 : 1;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

function newGame() {
  diceElement.classList.add('hidden');
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  setScore(document.getElementById(`current--${activePlayer}`), 0);
  playing = true;
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  setScore(score0Element, scores[0]);
  setScore(score1Element, scores[1]);
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

//Selecting Score Elements
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');
const rollDiceElement = document.querySelector('.btn--roll');
const newGameElement = document.querySelector('.btn--new');
const holdScoreElement = document.querySelector('.btn--hold');
const diceElement = document.querySelector('.dice');

//Setting game variables
let activePlayer = 0;
let scores = [0, 0];
let currentScore = 0;
let playing = true;

newGame();

rollDiceElement.addEventListener('click', function () {
  if (playing) {
    //Generate random dice roll
    const roll = Math.trunc(Math.random() * 6) + 1;
    //Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${roll}.png`;
    //Check dice roll
    if (roll !== 1) {
      //Add to current scores
      currentScore += roll;
      setScore(document.getElementById(`current--${activePlayer}`), currentScore);
    } else {
      //Switch to other players turn
      switchPlayer();
    }
  }
});

holdScoreElement.addEventListener('click', function () {
  if (playing) {
    //Add current score to active players score;
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    //Check if score greater than 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      //Switch active player
      switchPlayer();
    }
  }
});

newGameElement.addEventListener('click', function () {
  newGame();
});
