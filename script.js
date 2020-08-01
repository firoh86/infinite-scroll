const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey =
  '3c695475b1f6e529bff0aacd56ef18e5f28e5d021f5d354785805c5bae05ac63';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// Helper function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create elements for links & photos, Add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // run function for each object in photosArray

  photosArray.forEach((photo) => {
    // Create <a>
    const item = document.createElement('a');
    // create <img> for photo
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photo from unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch error Here
  }
};

// Check to see if scrolling near bottom of page, LOad more Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
      document.body.offsetHeight - window.innerHeight &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
