const userName = document.querySelector(".user-name");
const nameInput = userName.querySelector("input");
const printName = document.querySelector(".print-name");
const content = document.querySelector(".content");
const sideMenu = document.querySelector(".sidemenu");

function handleName(e) {
  e.preventDefault();
  if (nameInput.value !== "") {
    userName.style.display = "none";
    printName.innerText = `Wecome ${nameInput.value}!`;
    localStorage.setItem("user", nameInput.value);
    loadToDoList();
    loadToSideMenu();
  } else alert("please name");
}

function loadUserName() {
  const getUser = localStorage.getItem("user");
  if (getUser) {
    userName.style.display = "none";
    printName.innerText = `${getUser}'s To Do List`;
    loadToDoList();
    loadToSideMenu();
  }
}

function loadToDoList() {
  content.classList.add("showing");
}

function loadToSideMenu() {
  sideMenu.classList.add("showing");
}

function init() {
  loadUserName();
  userName.addEventListener("submit", handleName);
}

init();
