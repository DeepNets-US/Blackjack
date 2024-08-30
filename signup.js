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