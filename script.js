// Array to store users (username and password)
const users = [];

// DOM elements for different sections
const loginSection = document.getElementById("login-section"); // Login section
const diarySection = document.getElementById("diary-section"); // Diary section

// Login form elements
const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const signupLink = document.getElementById("signup-link"); // Link to sign-up form

// Sign-up form elements
const signupForm = document.getElementById("signup-form");
const signupUsername = document.getElementById("signup-username");
const signupPassword = document.getElementById("signup-password");
const signupBtn = document.getElementById("signup-btn");
const loginLink = document.getElementById("login-link"); // Link to login form

// Diary form elements
const mood = document.getElementById("mood");
const journal = document.getElementById("journal");
const submitBtn = document.getElementById("submit-btn");
const entriesList = document.getElementById("entries-list");
const calendar = document.getElementById("calendar"); // Calendar element

// Function to format the date as dd/mm/yy hh:mm AM/PM
function formatDateTime(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for the day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for the month (months are 0-indexed)
  const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
  
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0'); // Convert 24-hour to 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2 digits for minutes
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM
  
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`; // Return formatted date
}

// Show the sign-up form when the user clicks on the sign-up link
signupLink.addEventListener("click", () => {
  loginForm.style.display = "none"; // Hide login form
  signupForm.style.display = "block"; // Show sign-up form
});

// Show the login form when the user clicks on the login link
loginLink.addEventListener("click", () => {
  signupForm.style.display = "none"; // Hide sign-up form
  loginForm.style.display = "block"; // Show login form
});

// Handle the sign-up process
signupBtn.addEventListener("click", () => {
  const username = signupUsername.value.trim(); // Get username from input
  const password = signupPassword.value.trim(); // Get password from input

  // Check if both fields are filled
  if (!username || !password) {
    alert("Please fill in all fields!"); // Alert if either field is empty
    return;
  }

  // Check if the username already exists
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    alert("Username already exists!"); // Alert if the username already exists
    return;
  }

  // Add the new user to the users array
  users.push({ username, password });
  alert("Sign-Up successful! Please log in."); // Notify user that sign-up was successful

  // Clear input fields
  signupUsername.value = "";
  signupPassword.value = "";

  // Switch back to the login form
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

// Handle the login process
loginBtn.addEventListener("click", () => {
  const username = loginUsername.value.trim(); // Get username from input
  const password = loginPassword.value.trim(); // Get password from input

  // Find the user in the users array based on the username and password
  const user = users.find((user) => user.username === username && user.password === password);
  if (!user) {
    alert("Invalid username or password!"); // Alert if login fails
    return;
  }

  // Successful login
  alert(`Welcome back, ${username}!`);
  loginSection.style.display = "none"; // Hide the login section
  diarySection.style.display = "block"; // Show the diary section
});

// Handle the mood diary submission
submitBtn.addEventListener("click", () => {
  const selectedMood = mood.value; // Get selected mood from the dropdown
  const journalText = journal.value.trim(); // Get journal entry text
  const selectedDate = calendar.value; // Get selected date from the calendar

  // Check if all required fields are filled
  if (!selectedMood || !journalText || !selectedDate) {
    alert("Please select a mood, write about your day, and select a date!"); // Alert if any field is missing
    return;
  }

  // Get current time
  const currentTime = new Date();
  
  // Combine the selected date with the current time to ensure proper timestamp
  const combinedDateTime = new Date(selectedDate);
  combinedDateTime.setHours(currentTime.getHours());
  combinedDateTime.setMinutes(currentTime.getMinutes());
  combinedDateTime.setSeconds(currentTime.getSeconds());

  // Format the combined date and time
  const formattedDateTime = formatDateTime(combinedDateTime);

  // Create a new diary entry as an <li> element
  const entry = document.createElement("li");
  entry.innerHTML = `<strong>Date & Time:</strong> ${formattedDateTime} <br><strong>Mood:</strong> ${selectedMood} <br><strong>Reflection:</strong> ${journalText}`;
  entriesList.appendChild(entry); // Append the new entry to the entries list

  // Clear form inputs after submitting
  mood.value = "";
  journal.value = "";
  calendar.value = ""; // Clear the calendar field
  alert("Your entry has been added!"); // Notify user that the entry was successfully added
});
