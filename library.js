document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const leftButton = document.querySelector(".left-button");
  const rightButton = document.querySelector(".right-button");
  const table = document.querySelector(".table");
  const signText = document.querySelector(".sign-text");
  const book = document.querySelector(".book");
  const pages = document.querySelectorAll(".Page-1, .Page-2, .Page-3");
  const images = {
    0: [".image-1", ".image-2"], // Images for Page 1
    1: [".image-3", ".image-4"], // Images for Page 2
    2: [".image-5"], // Images for Page 3
  };
  const prevButton = document.querySelector(".Previous");
  const nextButton = document.querySelector(".Next");
  const character = document.querySelector(".character");

  let currentPage = 0; // Track the current page (0 = Page 1, 1 = Page 2, 2 = Page 3)
  let position = 10; // Character initial position
  let isJumping = false; // Track if the character is jumping

  // Initially hide the book and navigation buttons
  if (book) {
    book.style.display = "none";
    updatePage();
  }

  // Left navigation button functionality
  if (leftButton) {
    leftButton.addEventListener("click", function () {
      window.location.href = "home.html"; // Navigate to home page
    });
  }

  // Right navigation button functionality
  if (rightButton) {
    rightButton.addEventListener("click", function () {
      window.location.href = "museum.html"; // Navigate to museum page
    });
  }

  // Show the book when the table is clicked
  if (table) {
    table.addEventListener("click", function () {
      book.style.display = "flex"; // Show the book
      book.style.justifyContent = "center";
      book.style.alignItems = "center";
    });
  }

  // Close the book when the Escape key is pressed
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && book.style.display === "flex") {
      book.style.display = "none"; // Hide the book
      currentPage = 0; // Reset to the first page
      updatePage();
    }
  });

  // Navigate to the previous page
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      if (currentPage > 0) {
        currentPage--;
        updatePage();
      }
    });
  }

  // Navigate to the next page
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (currentPage < pages.length - 1) {
        currentPage++;
        updatePage();
      }
    });
  }

  // Update the visibility of pages and images
  function updatePage() {
    if (!pages || !images) return;

    // Hide all pages and deactivate images
    pages.forEach((page) => page.classList.remove("active"));
    Object.values(images)
      .flat()
      .forEach((selector) => {
        const img = document.querySelector(selector);
        if (img) img.style.display = "none";
      });

    // Show the current page and its images
    if (pages[currentPage]) pages[currentPage].classList.add("active");
    if (images[currentPage]) {
      images[currentPage].forEach((selector) => {
        const img = document.querySelector(selector);
        if (img) img.style.display = "block";
      });
    }

    // Update arrow visibility
    if (prevButton)
      prevButton.style.display = currentPage === 0 ? "none" : "block";
    if (nextButton)
      nextButton.style.display =
        currentPage === pages.length - 1 ? "none" : "block";
  }

  // Character movement and jump functionality
  document.addEventListener("keydown", function (event) {
    if (!character) return;

    if (event.key === "ArrowRight" && position < 90) {
      position += 2; // Move right by 2%
      character.style.left = `${position}%`;
    } else if (event.key === "ArrowLeft" && position > 0) {
      position -= 2; // Move left by 2%
      character.style.left = `${position}%`;
    } else if (event.key === " " && !isJumping) {
      // Trigger jump when spacebar is pressed and not already jumping
      isJumping = true;
      character.style.transition = "bottom 0.5s ease-out"; // Smooth jump up
      character.style.bottom = "150px"; // Jump height

      setTimeout(() => {
        character.style.bottom = "25px"; // Return to original position
        setTimeout(() => {
          isJumping = false; // Allow another jump
        }, 500); // Wait for landing before allowing another jump
      }, 500); // Time to stay in the air
    }
  });

  // Proximity check for character and table
  document.addEventListener("keydown", function () {
    if (!character || !table || !signText) return;

    const characterRect = character.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();

    if (
      characterRect.right >= tableRect.left &&
      characterRect.left <= tableRect.right &&
      characterRect.bottom >= tableRect.top &&
      characterRect.top <= tableRect.bottom
    ) {
      signText.style.display = "block"; // Show the sign text
    } else {
      signText.style.display = "none"; // Hide the sign text
    }
  });
});
