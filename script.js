const days = Object.freeze({
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
});
const months = Object.freeze({
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
});

const day = new Date();
console.log(days[day.getDay()]);
console.log(months[day.getMonth()]);
console.log(day.getFullYear());
console.log(day.getDate());

const year = 2026;
const month = 6;
const daysInNovember = new Date(year, month + 1, 0);
console.log(daysInNovember.getDate());

const week = [2, 3, 5, 3, 56, 4];
