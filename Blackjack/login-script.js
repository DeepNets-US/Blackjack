import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, set, get, ref } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

function writeUserData(userID, email, uname) {
    set(ref(db, 'users/' + userID), {
        email: email,
    });
}

function readData() {
    const userRef = ref(db, 'users');
    get(userRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
        });
    });
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password');
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
}

const showPasswordCheckbox = document.getElementById('show-password');
if (showPasswordCheckbox) {
    showPasswordCheckbox.addEventListener('change', togglePasswordVisibility);
}


function updateUsernameDisplay() {
    const usernameDisplay = document.getElementById('username-display');
    
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            usernameDisplay.textContent = user.email;
        }
    });
}

// Call the function to update username display
updateUsernameDisplay();


const login = document.getElementById('login-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameDisplay = document.getElementById('username-display');

login.addEventListener('click', (e) => {
    e.preventDefault();
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("Successfully Logged In...");
        console.log(user.email, user.id);
        writeUserData(user.uid, user.email);
        window.location.href = "index.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
});

// Optional Data Initialization
console.log("Data initialization complete");
readData();
