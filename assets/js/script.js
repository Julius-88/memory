document.addEventListener('DOMContentLoaded', function () {
    flippedCards();
    resetButton();
})

const cards = document.getElementsByClassName('cards');

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
    reset.addEventListener('click', function () {
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('flipped');
        }
    })
}