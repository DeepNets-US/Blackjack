// DOM elements
const moneyTxt = document.getElementById("moneyTxt");
const betIn = document.getElementById("betIn");

const dealerScore = document.getElementById("dealerScore");
const playerScore = document.getElementById("playerScore");

const hitbtn = document.getElementById("hitbtn");
const standbtn = document.getElementById("standbtn");
const doublebtn = document.getElementById("doublebtn");

const gameResultTxt = document.getElementById("gameResTxt");
const carouselDealer = document.getElementById("dealerHand");
const carouselPlayer = document.getElementById("playerHand");

const clickSound = document.getElementById("clickSound");
const betSound = document.getElementById("betSound");
const winSound = document.getElementById("winSound");
const brokeSound = document.getElementById("brokeSound");
const bruhSound = document.getElementById("bruhSound");

// Constants and Variables
const SUITS = ["H", "D", "S", "C"];
const CARDS = ['K', 'Q', 'A', 'J', 2, 3, 4, 5, 6, 7, 8, 9, 10];
const POINTS = { 'K': 10, 'Q': 10, 'A': Math.random() < 0.5 ? 1 : 11, 'J': 10 };
const SuitToFolder = {
    "C": "Clubs",
    "D": "Diamond",
    "H": "Heart",
    "S": "Spade"
}

// Game state
const questionImage = "./Images/question.png";
let DECK = [];
let playerHand = [];
let dealerHand = [];
let money = 5000;
let dealer = 0;
let player = 0;
let betValue = 0;

// Functions

function createDeck() {
    // Creates a deck of cards
    for (let suit of SUITS) {
        for (let card of CARDS) {
            DECK.push([suit, card]);
        }
    }
}

function getCard() {
    // Gets a random card from the deck
    const index = Math.floor(Math.random() * DECK.length);
    return DECK.splice(index, 1)[0];
}

function drawCard(deck, n = 1) {
    // Draws cards from the deck for the player or dealer
    for (let i = 0; i < n; i++) {
        const card = getCard();
        if (deck === 'p') {
            playerHand.push(card);
            updatePoints(card[1], 'p');
        } else {
            dealerHand.push(card);
            updatePoints(card[1], 'd');
        }
    }
}

function updatePoints(value, user) {
    // Updates points for the player or dealer
    value = typeof value === 'string' ? POINTS[value] : value;
    user === 'p' ? (player += value) : (dealer += value);
}

function displayHands(hideDealerHand) {
    dealerScore.innerHTML = dealer;
    playerScore.innerHTML = player;

    carouselDealer.innerHTML = '';
    for (let i = 0; i < dealerHand.length; i++) {
        const cardImage = (hideDealerHand && i === 0) ? 'question.png' : SuitToFolder[dealerHand[i][0]] + "/" + dealerHand[i][1] + '.png';

        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i === 0) {
            carouselItem.classList.add('active');
        }

        const img = document.createElement('img');
        img.classList.add('d-block', 'w-100');
        img.src = 'Deck/' + cardImage;
        img.alt = 'card image';
        carouselItem.appendChild(img);
        carouselDealer.appendChild(carouselItem);
    }

    carouselPlayer.innerHTML = '';
    for (let i = 0; i < playerHand.length; i++) {
        const cardImage = SuitToFolder[playerHand[i][0]] + "/" + playerHand[i][1] + '.png';

        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i === 0) {
            carouselItem.classList.add('active');
        }

        const img = document.createElement('img');
        img.classList.add('d-block', 'w-100');
        img.src = 'Deck/' + cardImage;
        img.alt = 'card image';
        carouselItem.appendChild(img);
        carouselPlayer.appendChild(carouselItem);
    }
}

function assignBet(betAmount) {
    betValue += betAmount;
}

function initialState() {
    // Initializes the game state
    player = 0;
    dealer = 0;
    playerHand = [];
    dealerHand = [];

    createDeck();
    drawCard('p', 2);
    drawCard('d', 2);
    displayHands(true);

    displayHands(true);
    gameResultTxt.innerHTML = '';
    moneyTxt.innerHTML = money;
}
// Function to manage dealer's actions
function dealerPlay() {
    if (player <= 21) {
        while (dealer < 17) {
            drawCard("d");
        }
    }
}

// Function for the 'hit' action
function hit() {
    userBet = parseInt(betIn.value);
    if (userBet > 0) {
        drawCard('p');
        displayHands(true);

        if (player > 21) {
            checkResult();
        }
    } else {
        alert("Choose your bet!");
    }
    clickSound.play();
}

// Function for the 'stand' action
function stand() {
    userBet = parseInt(betIn.value);
    if (userBet > 0) {
        checkResult();
    } else {
        alert("Choose your bet!");
    }
    clickSound.play();
}

// Function for 'double down' action
function doubleDown() {
    userBet = parseInt(betIn.value);
    if (userBet > 0) {
        assignBet(betValue);
        drawCard("p");
        checkResult();
    } else {
        alert("Choose your bet!");
    }
    clickSound.play();
}

// Function to check the result of the game
function checkResult() {
    dealerPlay();
    displayHands();

    if (dealer > 21) {
        const resultText = `Dealer busts! You win ${userBet}!`;
        gameResultTxt.innerHTML = resultText;
        gameResultTxt.style.color = "lightgreen";
        winSound.play();

        money = money + betValue;
        moneyTxt.innerHTML = money;
        betIn.value = '';
        betValue = 0;

    } else if (player > 21 || player < dealer) {
        const resultText = `You lost!`;
        gameResultTxt.innerHTML = resultText;
        gameResultTxt.style.color = "red";
        bruhSound.play();

        money = money - betValue;
        moneyTxt.innerHTML = money;
        betIn.value = '';
        betValue = 0;

    } else if (player > dealer) {
        const resultText = `You won ${userBet}!`;
        gameResultTxt.innerHTML = resultText;
        gameResultTxt.style.color = "lightgreen";
        winSound.play();

        money = money + betValue;
        moneyTxt.innerHTML = money;
        betIn.value = '';
        betValue = 0;

    } else if (player === dealer) {
        const resultText = `It is a tie, the bet is returned to you.`;
        gameResultTxt.innerHTML = resultText;
        gameResultTxt.style.color = "yellow";
        bruhSound.play();

        moneyTxt.innerHTML = money;
        betIn.value = '';
        betValue = 0;
    }


    // Check if the player has gone broke
    if (money <= 0) {
        moneyTxt.innerHTML = 0;
        gameResultTxt.innerHTML = 'You Went Broke!!';
        moneyTxt.style.color = "red";
        brokeSound.play();
    }

    if (money > 5000) {
        moneyTxt.style.color = "lightgreen";
    } else if (money < 5000) {
        moneyTxt.style.color = "orange";
    } else {
        moneyTxt.style.color = "white";
    }
}

// Event listener for bet input
betIn.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const userBet = parseInt(betIn.value);

        if (userBet > 0 && userBet <= money) {
            assignBet(userBet);
            initialState();
            betSound.play();
        } else {
            alert("Invalid bet value. Bet must be greater than 0 and less than or equal to total money.");
        }
    }
});

// Event listeners for game actions
hitbtn.addEventListener("click", hit);
standbtn.addEventListener("click", stand);
doublebtn.addEventListener("click", doubleDown);
