'use strict'

// selecting elements...
const player0 = document.querySelector('.player_0');
const player1 = document.querySelector('.player_1');
const rollBtn = document.querySelector('.roll_btn');
const holdBtn = document.querySelector('.hold_btn');
const newBtn = document.querySelector('.new_btn');
const dice = document.querySelector('.dice');

let score;
let activePlayer;
let currentScore;
let playing;

// function to inintialize the all values of the game...
const init = function(e){
    score = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = 1;
    
    dice.classList.add('hidden');

    document.querySelector('.score_0').textContent = '0';
    document.querySelector('.score_1').textContent = '0';
}
init();

// Switch player functionality...
const switchPlayer = function(){
    currentScore = 0;
    document.querySelector(`.current_score_${activePlayer}`).textContent = `${currentScore}`;
    
    // 1. remove player_active class from both player.
    player0.classList.remove('player_active');
    player1.classList.remove('player_active');
    // 2. switch the active player.
    activePlayer = activePlayer === 0 ? 1 : 0;
    // 3. add player_active class to active player element.
    document.querySelector(`.player_${activePlayer}`).classList.add('player_active');
}

// add eventlistener to roll btn...
rollBtn.addEventListener('click', function(e){
    e.preventDefault();

    if(playing){
        // 1.generate a random number between 1 and 6;
        const number = Math.trunc(Math.random() * 6 + 1);
        // 2.display the dice.
        dice.src = `dice-${number}.png`;
        dice.classList.remove('hidden');
        // 3.update the current score.
            // if dice shows 1, switch the player.
        if(number !== 1){
            currentScore += number;
            // display the current score.
            document.querySelector(`.current_score_${activePlayer}`).textContent = `${currentScore}`;
        }
        else{
            switchPlayer();
        }
    }
});

// add eventlistener to hold btn...
holdBtn.addEventListener('click', function(e){
    e.preventDefault();

    if(playing){
        // 1. add the current score to total score.
        score[activePlayer] += currentScore;
        document.querySelector(`.score_${activePlayer}`).textContent = `${score[activePlayer]}`;
        // 2. checking wether the total score is less than winning score (100) or not.
        if(score[activePlayer] >= 100){
            // initializing the current score.
            currentScore = 0;
            document.querySelector(`.current_score_${activePlayer}`).textContent = `${currentScore}`;
            // updating the winner to UI.
            document.querySelector(`.player_${activePlayer}`).classList.add('player_winner');
            // make game disable.
            playing = 0;
        }
        else{
            // 3. switch player.
            switchPlayer()
        }
    }
});

// add event listener to new game button...
newBtn.addEventListener('click', function(e){
    e.preventDefault();

    // 1. initialize the values. And remove the winner class from both players.
    init();
    player0.classList.remove('player_winner');
    player1.classList.remove('player_winner');
    // 2. make player 1 active.
    player1.classList.remove('player_active');
    player0.classList.add('player_active');
});

