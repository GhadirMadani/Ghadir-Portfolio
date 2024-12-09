document.addEventListener("DOMContentLoaded", () => {
  const frontCharacter = document.querySelector(".character-front");
  const backCharacter = document.querySelector(".character-back");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  // Show the front character when the left arrow is pressed
  leftArrow.addEventListener("click", () => {
    frontCharacter.style.display = "block";
    backCharacter.style.display = "none";
  });

  // Show the back character when the right arrow is pressed
  rightArrow.addEventListener("click", () => {
    frontCharacter.style.display = "none";
    backCharacter.style.display = "block";
  });

  // Add event listener for the Start button
  const startButton = document.querySelector(".start-btn");
  startButton.addEventListener("click", () => {
    window.location.href = "home.html"; // Navigate to resume.html
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Get elements from the DOM
  const instructionButton = document.querySelector(".instruction-btn");
  const instructionPage = document.querySelector(".instruction-page");

  // Function to show the instructions page fullscreen
  function showInstructions() {
    instructionPage.style.display = "flex"; // Use flex to center content
  }

  // Function to hide the instructions page
  function hideInstructions() {
    instructionPage.style.display = "none";
  }

  // Event listener for the instructions button
  instructionButton.addEventListener("click", showInstructions);

  // Event listener for the "esc" key to close the instructions page
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideInstructions();
    }
  });

  // Initially hide the instructions page
  hideInstructions();
});
