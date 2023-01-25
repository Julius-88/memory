document.addEventListener('DOMContentLoaded', function () {
    flippedCards();
    resetButton();
    shuffleCards();
    updateCounter();
    timerCount();
    pairCounter();
})

const cards = document.getElementsByClassName('cards');
let clicks = -1;
let timer = 0;
let openCardOne = null;
let pair = -1;

/**
 * Allows you to flip the cards you click on
 * and checks if they match
 */
function flippedCards() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function () {
            const color = this.querySelector('.card-back').getAttribute('data-color');
            if (openCardOne === null) {
                openCardOne = this;
                this.classList.add('flipped');
            } else if (color === openCardOne.querySelector('.card-back').getAttribute('data-color')) {
                this.classList.add('flipped');
                pairCounter();
                openCardOne = null;
            } else {
                openCardOne.classList.remove('flipped');
                openCardOne = this;
                this.classList.add('flipped');
            }
        });
    }
}

/**
 * Allows you to reset the board by clicking the reset button
 */
function resetButton() {
    let reset = document.getElementById('reset');
    let resetClick = document.getElementById('clicks');
    let resetTimer = document.getElementById('timer');
    reset.addEventListener('click', function () {
        setTimeout(function () {
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove('flipped');
                cards[i].classList.remove('match');
            }
            setTimeout(shuffleCards, 200);
            resetClick.textContent = 0;
            clicks = -1;
            resetTimer.textContent = 0;
            timer = 0;
        }, 300);
    })
}


// In order to create the shuffleCards I followed this video https://www.youtube.com/watch?v=myL4xmtAVtw
// and I looked at examples on W3schools. https://www.w3schools.com/js/js_htmldom_nodelist.asp https://www.w3schools.com/jsref/met_node_appendchild.asp
/**
 * Shuffles the cards so that they are in a random order
 */
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    let parent = document.getElementById('memory-container');
    for (let i = 0; i < cards.length; i++) {
        parent.appendChild(cards[i]);
    }
}

function pairCounter() {
    pair++;
    const pairs = document.getElementById('pairs');
    if (pairs) {
        pairs.textContent = pair;
    }
}

/**
 * Updates the click counter
 */
function updateCounter() {
    clicks++;
    const clicksSpan = document.getElementById('clicks');
    if (clicksSpan) {
        clicksSpan.textContent = clicks;
    }
}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        updateCounter();
    });
}


// This code was taken from https://www.youtube.com/watch?v=ubLC1JxMqfY 

/**
 * Makes the timer increment by 1 each second
 */
function timerCount() {
    const time = document.getElementById('timer');
    setInterval(function () {
        timer += 1;
        time.textContent = timer;
    }, 1000)
}