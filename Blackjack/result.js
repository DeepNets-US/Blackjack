// Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, get, ref } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxnfhr6v1gwGsckxH4BKACNP_-6DnS3hM",
    authDomain: "blackjack-b07cb.firebaseapp.com",
    projectId: "blackjack-b07cb",
    storageBucket: "blackjack-b07cb.appspot.com",
    messagingSenderId: "177108375726",
    appId: "1:177108375726:web:3b9d57a32ac9b6d707353f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

function readUserData(userID) {
    const userRef = ref(db, 'users/' + userID + '/gamingData');
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
                updateUI(data); // Update the UI with the fetched data
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error("Error reading data:", error);
        });
}

function updateUI(data) {
    document.getElementById('gamesPlayedValue').textContent = data.gamesPlayed;
    document.getElementById('gamesWonValue').textContent = data.gamesWon;
    document.getElementById('gamesLostValue').textContent = data.gamesLost;
    document.getElementById('moneyEarnedValue').textContent = `$${data.moneyEarned}`;
    document.getElementById('totalBetValue').textContent = `$${data.totalBet}`;
    document.getElementById('currentMoneyValue').textContent = `$${data.currentMoney}`;
    document.getElementById('hitsValue').textContent = data.hits;
    document.getElementById('standsValue').textContent = data.stands;
    document.getElementById('doubleDownsValue').textContent = data.doubleDowns;
    document.getElementById('brokeMomentsValue').textContent = data.brokeMoments > 0 ? `Yes (${data.brokeMoments} times)` : 'None';
}

function init() {
    const user = auth.currentUser;
    if (user) {
        readUserData(user.uid);
    } else {
        // Simulate a fake authentication change
        onAuthStateChanged(auth, (user) => {
            if (user) {
                readUserData(user.uid);
            } else {
                console.log('User is signed out');
            }
        });
    }
}

// Initialize when the result page loads
init();
