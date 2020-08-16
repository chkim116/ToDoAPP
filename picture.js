function loadImage() {
  fetch("https://source.unsplash.com/random")
    .then((respone) => respone.json())
    .then((json) => console.log(json));
}

loadImage();
