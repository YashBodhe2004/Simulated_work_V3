document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'cheeseburger', img: 'img/cheeseburger.png' },
        { name: 'cheeseburger', img: 'img/cheeseburger.png' },
        { name: 'fries', img: 'img/fries.png' },
        { name: 'fries', img: 'img/fries.png' },
        { name: 'hotdog', img: 'img/hotdog.png' },
        { name: 'hotdog', img: 'img/hotdog.png' },
        { name: 'ice-cream', img: 'img/ice-cream.png' },
        { name: 'ice-cream', img: 'img/ice-cream.png' },
        { name: 'milkshake', img: 'img/milkshake.png' },
        { name: 'milkshake', img: 'img/milkshake.png' },
        { name: 'pizza', img: 'img/pizza.png' },
        { name: 'pizza', img: 'img/pizza.png' },
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('#grid');
    const resultDisplay = document.querySelector('#result');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        cardArray.forEach((_, i) => {
            const card = document.createElement('img');
            card.setAttribute('src', 'img/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (optionOneId === optionTwoId) {
            alert('You clicked the same card!');
            cards[optionOneId].setAttribute('src', 'img/blank.png');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match!');
            cards[optionOneId].setAttribute('src', 'img/white.png');
            cards[optionTwoId].setAttribute('src', 'img/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            alert('Try again!');
            cards[optionOneId].setAttribute('src', 'img/blank.png');
            cards[optionTwoId].setAttribute('src', 'img/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!';
        }
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
});
