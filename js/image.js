const body = document.querySelector("body");

function images(imagNumber) {
  const image = new Image();
  image.src = `images/${imagNumber + 1}.jpg`;
  image.classList.add("bg");
  body.prepend(image);
}

function randomNumber() {
  const number = Math.floor(Math.random() * 4);
  images(number);
}

randomNumber();
