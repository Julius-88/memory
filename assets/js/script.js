const cards = document.getElementsByClassName('cards');

function flippedCards() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function () {
            this.classList.add('flipped');
        })
    }

}
flippedCards();