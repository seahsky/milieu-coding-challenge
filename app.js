// You are to create a card game for 4 players. 
// The players each draw a card from the deck each round. 
// The player who draws the highest card will win the round and score a point. 
// When there are no more cards left in the deck, 
// the game should end with a scoreboard that displays the players ranked in order of the total number of points they have scored.

const cardMap = new Map([
    ['A', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['10', 10],
    ['J', 11],
    ['Q', 12],
    ['K', 13]
]);

const cardSuitsMap = new Map([
    ['Spades', 4000],
    ['Hearts', 3000],
    ['Clubs', 2000],
    ['Diamonds', 1000]
]);

const playersMap = new Map([
    ['Player 1', 0],
    ['Player 2', 0],
    ['Player 3', 0],
    ['Player 4', 0]
]);


function startGame() {
    let cards = Array.from(generateCards());
    const players = playersMap;

    while (cards.length > 0) {
        const drawResults = new Map();
        // each player should draw a card
        for (const [name, score] of players) {
            drawResults.set(name, playerDrawCard(cards));
        }
        // check winners for the round
        const winnerName = getRoundWinner(drawResults);
        // the winner should score a point here
        players.set(winnerName, players.get(winnerName) + 1);
        // proceed to the next round
    }

    // display all the players and their score here (in decending order)
    console.table([...players].sort((a, b) => b[1] - a[1]));
}

function generateCards() {
    let result = new Map();

    for (const [suitName, suitValue] of cardSuitsMap) {
        for (const [cardName, cardValue] of cardMap) {
            result.set(`${suitName} ${cardName}`, suitValue + cardValue);
        }
    }

    return result;
}

function playerDrawCard(cards) {
    const cardValue = cards.splice(Math.floor(Math.random() * cards.length), 1)[0][1];
    return cardValue;
}

function getRoundWinner(roundResult) {
    let winnerKey = '', winnerValue = 0;
    for (const [key, value] of roundResult) {
        if (value > winnerValue) {
            winnerKey = key;
            winnerValue = value;
        }
    }
    return winnerKey;
}

startGame();