// GLOBAL VAR
const ACTIVE = "active";
const TODOLIST = "TODOLIST";
const FINISHED = "FINISHED";
const SHOWING = "showing";
//  calendar

const startCalendarForm = document.querySelector(".start-form");
const startCalendar = startCalendarForm.querySelector("input");
const finishCalendarForm = document.querySelector(".finish-form");
const finishCalendar = finishCalendarForm.querySelector("input");

const startDate = {
  startYear: null,
  startMonth: null,
  startDay: null,
};

const finishDate = {
  finishYear: null,
  finishMonth: null,
  finishDay: null,
  hasFirshDay: false,
};

function handleStartCalendar(e) {
  let target = e.target.valueAsDate;
  startDate.startYear = target.getFullYear();
  startDate.startMonth = target.getMonth();
  startDate.startDay = target.getDate();
  finishDate.hasFirshDay = true;
}
function handleFinishCalendar(e) {
  let target = e.target.valueAsDate;
  const { hasFirshDay } = finishDate;
  if (hasFirshDay !== true) {
    finishCalendar.value = "";
    alert("시작날을 선택해 주세요");
  }
  if (hasFirshDay === true) {
    finishDate.finishMonth = target.getMonth();
    finishDate.finishYear = target.getFullYear();
    finishDate.finishDay = target.getDate();
  }
}

startCalendar.addEventListener("input", handleStartCalendar);
finishCalendar.addEventListener("input", handleFinishCalendar);

// sideMenu Open To-do-list OR Finished List

const todosBtn = document.querySelector(".todosbtn");
const finishedBtn = document.querySelector(".finishedbtn");
const wrapToDoFinished = document.querySelector(".wrap__finished");
const active = document.querySelector(".active");
const toDosList = todosBtn.querySelector("span");
const finishedList = finishedBtn.querySelector("span");

function handleToDoFinished(e) {
  const target = e.target;
  if (!target.classList.contains(ACTIVE)) {
    todosBtn.classList.remove(ACTIVE);
    finishedBtn.classList.add(ACTIVE);
  } else {
    todosBtn.classList.remove(ACTIVE);
  }
  wrapToDoList.classList.remove("hide");
  wrapToDoFinished.classList.add("hide");
}

function handleToDos(e) {
  const target = e.target;
  if (!target.classList.contains(ACTIVE)) {
    finishedBtn.classList.remove(ACTIVE);
    todosBtn.classList.add(ACTIVE);
  } else {
    finishedBtn.classList.remove(ACTIVE);
  }
  wrapToDoFinished.classList.remove("hide");
  wrapToDoList.classList.add("hide");
}

finishedBtn.addEventListener("click", handleToDoFinished);
todosBtn.addEventListener("click", handleToDos);

//   TODOLIST

const wrapToDoList = document.querySelector(".wrap__todolist");
const toDoForm = document.querySelector(".todo-form");
const input = toDoForm.querySelector("input");
const toDoList = document.querySelector("ul");
const finishedToDo = document.querySelector(".todo-finished");
const toDoNoList = document.querySelector(".todo-list-no");
const finishNoList = document.querySelector(".todo-finished-no");

let todos = [];
let finishedDos = [];

// check List

function checkToDos() {
  if (todos.length !== 0) {
    toDosList.innerText = `(${todos.length})`;
    toDoNoList.style.display = "none";
  } else {
    toDosList.innerText = "";
    toDoNoList.style.display = "block";
  }
}

function checkFinished() {
  if (finishedDos.length !== 0) {
    finishedList.innerText = `(${finishedDos.length})`;
    finishNoList.style.display = "none";
  } else {
    finishedList.innerText = "";
    finishNoList.style.display = "block";
  }
}

// Delete List

function handleDelToDos(e) {
  const li = e.target.parentNode.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = todos.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  todos = cleanToDos;
  checkToDos();
  saveToDo();
}

function handleDelFinished(e) {
  const li = e.target.parentNode.parentNode;
  finishedToDo.removeChild(li);
  const cleanToDos = finishedDos.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  finishedDos = cleanToDos;
  checkFinished();
  saveFinished();
}

// Done List (To Do List -> Finished List)

function handleDoneList(e) {
  const li = e.target.parentNode.parentNode;
  console.log(e.target.parentNode.parentNode);
  finishNoList.style.display = "none";
  handleCreateFinished(li.innerText);

  handleDelToDos(e);
}

// Save on Localstorage

function saveToDo() {
  localStorage.setItem("TODOLIST", JSON.stringify(todos));
}

function saveFinished() {
  localStorage.setItem("FINISHED", JSON.stringify(finishedDos));
}

// Create List - To Do List
function handleCreateToDo(list, start, finish) {
  const li = document.createElement("li");
  const done = document.createElement("span");
  const del = document.createElement("span");
  const date = document.createElement("div");
  date.setAttribute("class", "todolist-date");
  del.innerHTML = `<i class="far fa-trash-alt delbtn"></i>`;
  del.addEventListener("click", handleDelToDos);
  done.innerHTML = `<i class="far fa-check-circle donebtn"></i>`;
  done.addEventListener("click", handleDoneList);
  toDoList.appendChild(li);
  li.innerText = list;
  li.appendChild(done);
  li.id = todos.length + 1;
  li.appendChild(del);
  li.appendChild(date);

  let todosObj = {
    text: list,
    id: todos.length + 1,
    startDateText: start,
    finishDateText: finish,
  };

  if (finishDate.hasFirshDay === true) {
    const { startYear, startMonth, startDay } = startDate;
    const { finishYear, finishMonth, finishDay } = finishDate;
    const startDateText = `${startYear}/${startMonth + 1}/${startDay}`;
    const finishDateText = `${finishYear}/${finishMonth + 1}/${finishDay}`;

    if (!finishYear && !finishMonth && !finishDay) {
      todosObj.startDateText = startDateText;
    } else {
      todosObj.startDateText = startDateText;
      todosObj.finishDateText = finishDateText;
    }
  } else {
    date.innerText = "";
  }

  if (todosObj.startDateText !== undefined) {
    date.innerText =
      todosObj.finishDateText === undefined
        ? (date.innerText = todosObj.startDateText)
        : (date.innerText = `${todosObj.startDateText}~${todosObj.finishDateText}`);
  }

  todos.push(todosObj);
  checkToDos();
  saveToDo();
}

// Create List - Finished List

function handleCreateFinished(list) {
  const finishedDay = new Date();
  const finishDate = `${finishedDay.getFullYear()}/${
    finishedDay.getMonth() + 1
  }/${finishedDay.getDate()}`;
  const li = document.createElement("li");
  const del = document.createElement("span");
  const date = document.createElement("span");
  date.setAttribute("class", "finished-date");
  date.innerHTML = finishDate;
  del.innerHTML = `<i class="far fa-trash-alt delbtn"></i>`;
  del.addEventListener("click", handleDelFinished);
  finishedToDo.appendChild(li);

  li.innerText = list;
  li.style.textDecoration = "line-through";

  li.id = finishedDos.length + 1;
  li.appendChild(del);
  li.appendChild(date);

  let finishedDosObj = {
    text: list,
    id: finishedDos.length + 1,
    finishedDate: finishDate,
  };

  console.log(finishDate);
  finishedDos.push(finishedDosObj);
  checkFinished();
  saveFinished();
}

// Save Finished Date
function handleLoadFinished(list, saveFinishedDate) {
  const li = document.createElement("li");
  const del = document.createElement("span");
  const date = document.createElement("span");
  date.setAttribute("class", "finished-date");
  date.innerHTML = saveFinishedDate;
  del.innerHTML = `<i class="far fa-trash-alt delbtn"></i>`;
  del.addEventListener("click", handleDelFinished);
  finishedToDo.appendChild(li);

  li.innerText = list;
  li.style.textDecoration = "line-through";

  li.id = finishedDos.length + 1;
  li.appendChild(del);
  li.appendChild(date);

  let finishedDosObj = {
    text: list,
    id: finishedDos.length + 1,
    finishedDate: saveFinishedDate,
  };

  finishedDos.push(finishedDosObj);
  checkFinished();
  saveFinished();
}

// List Submit

function handleToDo(e) {
  const list = input.value;
  if (!list) {
    alert("입력");
  } else {
    e.preventDefault();
    handleCreateToDo(list);
    input.value = "";
    startCalendar.value = "";
    finishCalendar.value = "";
    finishDate.hasFirshDay = false;
  }
}

// Load LocalStorage

function loadLocalStorage() {
  const getToDos = localStorage.getItem("TODOLIST");
  const getFinished = localStorage.getItem("FINISHED");
  if (getToDos) {
    const getToDo = JSON.parse(getToDos);
    getToDo.forEach((list) => {
      handleCreateToDo(list.text, list.startDateText, list.finishDateText);
    });
  }
  if (getFinished) {
    const getFinish = JSON.parse(getFinished);
    getFinish.forEach((list) => {
      handleLoadFinished(list.text, list.finishedDate);
    });
  }
}

function noList() {}

loadLocalStorage();
toDoForm.addEventListener("submit", handleToDo);
