document.addEventListener("DOMContentLoaded", function () {
  const character = document.querySelector(".character");
  const button = document.querySelector(".button");
  const downloadText = document.querySelector(".download-text");
  const buttonText = document.querySelector(".button-text");

  let position = 10; // Initial position of the character
  let isJumping = false;

  downloadText.style.opacity = 0; // Ensure text is hidden initially
  buttonText.style.opacity = 0;

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" && position < 90) {
      position += 2;
      character.style.left = `${position}%`;
    } else if (event.key === "ArrowLeft" && position > 0) {
      position -= 2;
      character.style.left = `${position}%`;
    } else if (event.key === " " && !isJumping) {
      isJumping = true;
      character.style.transition = "bottom 0.5s ease-out";
      character.style.bottom = "150px";

      setTimeout(() => {
        character.style.bottom = "35px";
        setTimeout(() => {
          isJumping = false;
        }, 500);
      }, 500);
    }

    const characterRect = character.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const isTouchingButton =
      characterRect.right > buttonRect.left &&
      characterRect.left < buttonRect.right &&
      characterRect.bottom > buttonRect.top &&
      characterRect.top < buttonRect.bottom;

    if (isTouchingButton) {
      downloadText.style.opacity = 1;
      buttonText.style.opacity = 1;
    } else {
      downloadText.style.opacity = 0;
      buttonText.style.opacity = 0;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Back button functionality
  const backButton = document.querySelector(".back-btn");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "index.html"; // Replace with the correct file path
    });
  }

  // Right button functionality to navigate to library.html
  const rightButton = document.querySelector(".right-button");
  if (rightButton) {
    rightButton.addEventListener("click", function () {
      window.location.href = "library.html"; // Replace with the correct file path
    });
  }
});
