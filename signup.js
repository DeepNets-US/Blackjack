// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxnfhr6v1gwGsckxH4BKACNP_-6DnS3hM",
  authDomain: "blackjack-b07cb.firebaseapp.com",
  projectId: "blackjack-b07cb",
  storageBucket: "blackjack-b07cb.appspot.com",
  messagingSenderId: "177108375726",
  appId: "1:177108375726:web:3b9d57a32ac9b6d707353f"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// Get the form elements
const signUpForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const signUpButton = document.getElementById('signup-btn');

// Add an event listener to the sign up button
signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  // alert('hi')

  // Get the user input values
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validate the user input
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  console.log(password)

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    // alert("Creating Account...")
    // window.location.href = "index.html"
    alert("Successfully Signed Up! Redirecting to login...");
    window.location.href = "login.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });

  // Send a POST request to the /signup route
  fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      } else {
        // Redirect to the login page
        window.location.href = 'login.html';
      }
    })
    .catch((err) => console.error(err));
});


// Delete below line
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