document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const leftButton = document.querySelector(".left-button");
  const rightButton = document.querySelector(".right-button");
  const painting = document.querySelector(".painting");
  const paintingTextSign = document.querySelector(".painting-sign .text-sign");
  const character = document.querySelector(".character");
  const architecture = document.querySelector(".architecture");
  const architectureTextSign = document.querySelector(
    ".architecture-sign .text-sign"
  );

  let position = 10; // Initial position of the character
  let isJumping = false; // Track if the character is already jumping

  // Navigate to library.html when the left button is clicked
  if (leftButton) {
    leftButton.addEventListener("click", function () {
      window.location.href = "library.html";
    });
  }

  // Placeholder for future functionality on the right button
  if (rightButton) {
    rightButton.addEventListener("click", function () {
      alert("Future functionality goes here!");
    });
  }

  // Function to check collision between character and painting
  function checkCollisionWithPainting() {
    if (!character || !painting || !paintingTextSign) return;

    const characterRect = character.getBoundingClientRect();
    const paintingRect = painting.getBoundingClientRect();

    if (
      characterRect.right >= paintingRect.left &&
      characterRect.left <= paintingRect.right &&
      characterRect.bottom >= paintingRect.top &&
      characterRect.top <= paintingRect.bottom
    ) {
      paintingTextSign.style.display = "block"; // Show text when collision occurs
    } else {
      paintingTextSign.style.display = "none"; // Hide text otherwise
    }
  }

  // Function to check collision between character and architecture model
  function checkCollisionWithArchitecture() {
    if (!character || !architecture || !architectureTextSign) return;

    const characterRect = character.getBoundingClientRect();
    const architectureRect = architecture.getBoundingClientRect();

    if (
      characterRect.right >= architectureRect.left &&
      characterRect.left <= architectureRect.right &&
      characterRect.bottom >= architectureRect.top &&
      characterRect.top <= architectureRect.bottom
    ) {
      architectureTextSign.style.display = "block"; // Show text when collision occurs
    } else {
      architectureTextSign.style.display = "none"; // Hide text otherwise
    }
  }

  // Character movement and jump functionality
  document.addEventListener("keydown", function (event) {
    if (!character) return;

    if (event.key === "ArrowRight" && position < 90) {
      position += 2; // Move right by 2%
      character.style.left = `${position}%`;
      checkCollisionWithPainting(); // Check collision with painting after moving
      checkCollisionWithArchitecture(); // Check collision with architecture after moving
    } else if (event.key === "ArrowLeft" && position > 0) {
      position -= 2; // Move left by 2%
      character.style.left = `${position}%`;
      checkCollisionWithPainting(); // Check collision with painting after moving
      checkCollisionWithArchitecture(); // Check collision with architecture after moving
    } else if (event.key === " " && !isJumping) {
      // Trigger jump when spacebar is pressed and not already jumping
      isJumping = true;
      character.style.transition = "bottom 0.5s ease-out"; // Smooth jump up
      character.style.bottom = "150px"; // Jump height

      setTimeout(() => {
        character.style.bottom = "25px"; // Return to original position
        setTimeout(() => {
          isJumping = false; // Allow another jump
          checkCollisionWithPainting(); // Check collision with painting after landing
          checkCollisionWithArchitecture(); // Check collision with architecture after landing
        }, 500); // Wait for landing before allowing another jump
      }, 500); // Time to stay in the air
    }
  });

  // Initial collision check
  checkCollisionWithPainting();
  checkCollisionWithArchitecture();
});

document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const paintingImage = document.querySelector(".painting-image");
  const paintingInfo = document.querySelector(".painting-info");
  const architectureModel = document.querySelector(".architecture-model");
  const architectureInfo = document.querySelector(".architecture-info");

  // Function to show the info element
  function showInfo(infoElement) {
    if (infoElement) {
      infoElement.style.display = "flex"; // Show the info in the center
    }
  }

  // Function to hide the info element
  function hideInfo(infoElement) {
    if (infoElement) {
      infoElement.style.display = "none"; // Hide the info
    }
  }

  // Show painting info when the painting is clicked
  if (paintingImage) {
    paintingImage.addEventListener("click", function () {
      showInfo(paintingInfo);
    });
  }

  // Show architecture info when the model is clicked
  if (architectureModel) {
    architectureModel.addEventListener("click", function () {
      showInfo(architectureInfo);
    });
  }

  // Close the info when the Escape key is pressed
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideInfo(paintingInfo); // Hide painting info
      hideInfo(architectureInfo); // Hide architecture info
    }
  });
});
