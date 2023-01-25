document.addEventListener('DOMContentLoaded', function () {
    flippedCards();
    resetButton();
    shuffleCards();
    updateCounter();
})

const cards = document.getElementsByClassName('cards');
let clicks = -1;

/**
 * Allows you to flip the cards you click on
 */
function flippedCards() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function () {
            this.classList.add('flipped');
        })
    }
}

/**
 * Allows you to reset the board by clicking the reset button
 */
function resetButton() {
    let reset = document.getElementById('reset');
    let resetClick = document.getElementById('clicks');
    reset.addEventListener('click', function () {
        setTimeout(function () {
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove('flipped');
            }
            setTimeout(shuffleCards, 200);
            resetClick.textContent = 0;
            clicks = -1;
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