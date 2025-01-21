const endDiv = document.getElementById("end");
const galleryDiv = document.getElementById("gallery");
const spinnerDiv = document.getElementById("spinner");

let pageNumber = 1;

function loadImages() {
  const apiKey = "SyvKzTMu8S5fXh12zVfoaCGD8bDaRhn9R5BJi_RyJW0";
  const apiURL = `https://api.unsplash.com/photos?page=${pageNumber}&per_page=12&client_id=${apiKey}`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((images) => {
      if (images.length === 0) {
        endDiv.remove();
        return;
      }

      images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.urls.small;
        img.alt = image.alt_description || "Image";
        galleryDiv.appendChild(img);
      });

      pageNumber++;
      spinnerDiv.style.display = "none"; // Hide loading spinner
    });
}

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadImages();
  }
});

observer.observe(endDiv);

loadImages();
