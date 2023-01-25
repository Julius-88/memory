document.addEventListener('DOMContentLoaded', function () {
    flippedCards();
    resetButton();
    shuffleCards();
    updateCounter();
    timerCount();
    pairCounter();
})

const cards = document.getElementsByClassName('cards');
const start = document.getElementById('start-button');
const visibleGame = document.getElementById('memory-container');

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
    let resetButton = document.getElementById('reset-button');
    let resetClick = document.getElementById('clicks');
    let resetTimer = document.getElementById('timer');
    let resetPairCount = document.getElementById('pairs');

    resetButton.addEventListener('click', function () {
        setTimeout(function () {
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove('flipped');
                cards[i].classList.remove('match');
            }
            setTimeout(shuffleCards, 200);
            resetClick.textContent = 0;
            resetTimer.textContent = 0;
            clearInterval(intervalID);
            resetPairCount.textContent = 0;
            visibleGame.style.visibility = 'hidden';
            start.style.visibility = 'visible';
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

/**
 * Adds points to the pairs counter
 */
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
    const clickCounter = document.getElementById('clicks');
    if (clickCounter) {
        clickCounter.textContent = clicks;
    }
}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        updateCounter();
    });
}


// The timerCount code was taken from https://www.youtube.com/watch?v=ubLC1JxMqfY 
// The idea for how to stop the interval was taken from https://www.tutorialrepublic.com/faq/how-to-stop-setinterval-call-in-javascript.php line 14 and 28

/**
 * Makes the timer increment by 1 each second
 * and shows game cards
 */
function timerCount() {
    const time = document.getElementById('timer');
    start.addEventListener('click', function () {
        intervalID = setInterval(function () {
            timer += 1;
            time.textContent = timer;
        }, 1000)
        visibleGame.style.visibility = 'visible';
        start.style.visibility = 'hidden';
    });
}