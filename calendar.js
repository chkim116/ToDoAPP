//  달력
const startPrevMonth = document.querySelector(".prevM");
const startNextMonth = document.querySelector(".nextM");
const tdstartCalendar = document.querySelector(".calendar__start");
const startCalendarYM = document.querySelector(".calendar__start-days");
const startValue = document.querySelector(".start");
const startSubmitBtn = document.querySelector(".start-submit");

const tdFinishCalendar = document.querySelector(".calendar__finish");
const finishCalendarYM = document.querySelector(".calendar__finish-days");
const finishPrevMonth = document.querySelector(".prev-btn");
const finishNextMonth = document.querySelector(".next-btn");
const finishValue = document.querySelector(".finish");
const finishSubmitBtn = document.querySelector(".finish-submit");

const startCalendar = {
  startYear: null,
  startMonth: null,
  startDay: null,
};

const finishCalendar = {
  finishYear: null,
  finishMonth: null,
  finishDay: null,
  hasFirshDay: false,
};

let today = new Date();
let day = new Date();

function startPrevHandle() {
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  buildCalendar(tdstartCalendar, startCalendarYM);
  firstDay();
}

function startNextHandle() {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  buildCalendar(tdstartCalendar, startCalendarYM);

  firstDay();
}

function finishPrevHandle() {
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  buildCalendar(tdFinishCalendar, finishCalendarYM);
  secondDay();
}

function finishNextHandle() {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  buildCalendar(tdFinishCalendar, finishCalendarYM);
  secondDay();
}

function buildCalendar(tbcalendar, calendarYM) {
  const currentFirstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentLastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  calendarYM.innerHTML = `${today.getFullYear()}-${today.getMonth() + 1}`;

  let row = null;
  let countDay = 0;

  while (tbcalendar.rows.length > 2) {
    tbcalendar.deleteRow(tbcalendar.rows.length - 1);
  }

  row = tbcalendar.insertRow();

  for (i = 0; i < currentFirstDay.getDay(); i++) {
    cell = row.insertCell();
    countDay = countDay + 1;
  }
  for (i = 1; i <= currentLastDay.getDate(); i++) {
    cell = row.insertCell();
    cell.innerText = i;
    cell.classList.add("days");
    countDay = countDay + 1;
    if (countDay % 7 == 0) row = tbcalendar.insertRow();
    if (cell.innerText == startCalendar.startDay)
      cell.innerText =
          ? cell.classList.add("selectedDay")
  }
}

function handleFirstDays(e) {
  const target = e.target;
  const currentY = today.getFullYear();
  const currentM = today.getMonth() + 1;
  const selected = document.querySelector(".selectedDay");
  if (selected) {
    selected.classList.remove("selectedDay");
    target.classList.add("selectedDay");
  } else {
    target.classList.add("selectedDay");
  }
  startCalendar.startYear = currentY;
  startCalendar.startMonth = currentM;
  startCalendar.startDay = parseInt(target.innerText);
}

function handleNextDays(e) {
  const target = e.target;
  const currentY = today.getFullYear();
  const currentM = today.getMonth() + 1;
  const selected = document.querySelector(".selectedDay");
  if (selected) {
    selected.classList.remove("selectedDay");
    target.classList.add("selectedDay");
  } else {
    target.classList.add("selectedDay");
  }
  finishCalendar.finishYear = currentY;
  finishCalendar.finishMonth = currentM;
  finishCalendar.finishDay = parseInt(target.innerText);
}

function firstDay() {
  const days = document.querySelectorAll(".days");
  days.forEach((text) => {
    text.addEventListener("click", handleFirstDays);
  });
}

function secondDay() {
  const days = document.querySelectorAll(".days");
  days.forEach((text) => {
    text.addEventListener("click", handleNextDays);
  });
}

function handleStartCalendar() {
  tdstartCalendar.classList.toggle("showing");
  buildCalendar(tdstartCalendar, startCalendarYM);
  firstDay();
}

function handleFinishCalendar() {
  tdFinishCalendar.classList.toggle("showing");
  buildCalendar(tdFinishCalendar, finishCalendarYM);
  secondDay();
}

function handleStartSubmit() {
  const { startYear, startMonth, startDay } = startCalendar;
  if (startDay !== null) {
    startValue.innerText = `${startYear}-${startMonth}-${startDay}`;
  } else {
    startValue.innerText = "입력";
  }
  tdstartCalendar.classList.toggle("showing");
  finishCalendar.hasFirshDay = true;
}

function handleFinishSubmit() {
  const { finishYear, finishMonth, finishDay, hasFirshDay } = finishCalendar;
  if (hasFirshDay) {
    finishDay !== null
      ? (finishValue.innerText = `${finishYear}-${finishMonth}-${finishDay}`)
      : (finishValue.innerText = "입력");
    tdFinishCalendar.classList.toggle("showing");
  } else {
    alert("error");
    tdFinishCalendar.classList.toggle("showing");
  }
}
function init() {
  startPrevMonth.addEventListener("click", startPrevHandle);
  startNextMonth.addEventListener("click", startNextHandle);
  finishPrevMonth.addEventListener("click", finishPrevHandle);
  finishNextMonth.addEventListener("click", finishNextHandle);
  startSubmitBtn.addEventListener("click", handleStartSubmit);
  finishSubmitBtn.addEventListener("click", handleFinishSubmit);
  startValue.addEventListener("click", handleStartCalendar);
  finishValue.addEventListener("click", handleFinishCalendar);
}

init();
