// clock
const date = document.querySelector(".date");
const hour = document.querySelector(".hours");

function handledate() {
  const currnetDay = new Date();
  const year = currnetDay.getFullYear();
  const month = currnetDay.getMonth() + 1;
  const day = currnetDay.getDate();
  const hours = currnetDay.getHours();
  const minutes = currnetDay.getMinutes();
  const seconds = currnetDay.getSeconds();
  hour.innerHTML = `${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  date.innerHTML = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    day < 10 ? `0${day}` : `${day}`
  }`;
}

setInterval(handledate, 1000);
