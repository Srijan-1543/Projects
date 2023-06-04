const popup = document.querySelector('.popup');

// Show the popup
function showPopup() {
  popup.style.display = 'block';
  setTimeout(hidePopup, 2000); // Hide the popup after 2 seconds
}

// Hide the popup
function hidePopup() {
  popup.style.display = 'none';
}

// Call the showPopup function when the page is loaded
window.addEventListener('DOMContentLoaded', showPopup);