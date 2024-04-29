'use strict';

//selecting Elements  =====================>>>>>

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// selecting dice

const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn-newGame');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let scores, activePlayer, currentScore, Playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  Playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
 
// setting the inital moment to 0 for all
init();

// switching the player
const switchPlayer = function () {
  // setting first the current score 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // switch the player and add class
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling a dice and and impliment current score both side

btnRoll.addEventListener('click', function () {
  if (Playing) {
    // 1. Rolling the dice first
    const dice = Math.round(Math.random() * 5) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // checking for not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// button Hold impliments and logic for < 100

btnHold.addEventListener('click', function () {
  if (Playing) {
    // adding the scores[0,0]
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // checking the score is greater than 100

    if (scores[activePlayer] >= 100) {
      Playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// button new game impliment 
btnNewGame.addEventListener('click',init);