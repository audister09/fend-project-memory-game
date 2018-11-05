/*
 * Create a list that holds all of your cards
 */
const tiles = ['fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb',
];

const cardsContainer = document.querySelector('.deck');

let flippedTiles = [];
let matchedTiles = [];

/*
 * Layout the tiles
 */
function initGame() {
  // // Variable for shuffled cards
  let mixTiles = shuffle(tiles);

  for (let i = 0; i < tiles.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `<i class='fa ${tiles[i]}'></i>`;
    cardsContainer.appendChild(card);

    //Add click event each tiles
    click(card);
  }
  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);

}

/*
 * Click event
 */
function click(card) {

  //Event listener upon click
  card.addEventListener('click', function() {

    const presentTile = this;
    const previousTile = flippedTiles[0];

    //Existing flipped cards
    if (flippedTiles.length === 1) {

      card.classList.add('open', 'show', 'disable');
      flippedTiles.push(this);

      //Compare 2 flipped cards
      compare(presentTile, previousTile);
    } else {

      //No flipped cards
      presentTile.classList.add('open', 'show', 'disable');
      flippedTiles.push(this);

    }
  });
}

/*
 * Compare 2 tiles
 */
function compare(presentTile, previousTile) {

    //Match tiles
    if (presentTile.innerHTML === previousTile.innerHTML) {
    presentTile.classList.add('match');
    previousTile.classList.add('match');

    matchedTiles.push(presentTile, previousTile);

    flippedTiles = [];

    //Check if game is OVER
    gameOver();

  } else {

    setTimeout(function() {
      presentTile.classList.remove('open', 'show', 'disable');
      previousTile.classList.remove('open', 'show', 'disable');
      flippedTiles = [];
    }, 500);
  }
    // Count new move
      countMove();
}

// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

/*
 * Is the game over?
 */
function gameOver() {
  if (matchedTiles.length === tiles.length) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    alert('Congratulations! You have completed the game.')
  }
}

/*
 * Reset the game
 */
const resetBtn = document.querySelector('.restart');
resetBtn.addEventListener('click', function() {
  // Delete all flippedTiles
    cardsContainer.innerHTML = '';

  // call init to create new deck
  initGame();

  // Reset variables
  matchedTiles = [];
  moves = 0;
  movesContainer.innerHTML = 0;
});

/*
 * Move counter
 */
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;
function countMove() {
    moves++;
    movesContainer.innerHTML = moves;
    rating();
    if(moves == 1){
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

const starsRating = document.querySelector('.stars');
function rating() {
  switch(moves) {
    case 20:
      starsRating.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;
      break;
    case 25:
      starsRating.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}

/*
 * Start the game!
 */
initGame();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
