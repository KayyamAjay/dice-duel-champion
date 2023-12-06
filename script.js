'use strict';

//Selecting elements
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const cuurent1El = document.getElementById('current--0');
const cuurent2El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.btn--rule');

// Starting conditions
let scores;
let currentScore;
let activePlayer;
let playing;
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1; // player 1
  playing = true;
  score1El.textContent = 0;
  score2El.textContent = 0;
  cuurent1El.textContent = 0;
  cuurent2El.textContent = 0;
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer - 1}`).textContent =
    currentScore;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRollEl.addEventListener('click', () => {
  if (playing) {
    //1. Generate a Random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer - 1}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', () => {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`score--${activePlayer - 1}`).textContent =
      scores[activePlayer - 1];
    // check if players's ascore is >=100
    if (scores[activePlayer - 1] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer - 1}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer - 1}`)
        .classList.remove('player--active');
    } else {
      //swtich the player
      switchPlayer();
    }
  }
});

btnNewEl.addEventListener('click', () => {
  init();
});

btnOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
