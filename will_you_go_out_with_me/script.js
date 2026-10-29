let root = document.querySelector("#root");
const calendar = document.createElement("div");
let heading = document.createElement("h1");
heading.textContent = "Will you go out with me";
let buttons_container = document.createElement("div");
let yesBtn = document.createElement("button");
yesBtn.textContent = "YES";
let NoBtn = document.createElement("button");
NoBtn.textContent = "NO";
buttons_container.classList.add("buttons");
buttons_container.append(yesBtn, NoBtn);
root.append(heading);
root.append(buttons_container);

root.classList.add("body");
let thisYear = 0;
const currentYear = new Date();
yesBtn.addEventListener("click", () => {
  heading.textContent = "Nice, When are you free for our date?";
  buttons_container.style.display = "none";
  const year_input = document.createElement("input");
  const errorSpan = document.createElement("span");
  errorSpan.classList.add("error-year");
  year_input.setAttribute("placeholder", "Enter year: ");
  year_input.maxLength = 4;
  year_input.required = true;
  root.append(year_input);
  year_input.focus();
  year_input.addEventListener("keydown", (event) => {
    if (year_input.value.trim() && /^\d{4}$/.test(year_input.value)) {
      if (event.key === "Enter") {
        if (!(year_input.value >= currentYear.getFullYear())) {
          errorSpan.textContent = "Invalid Year";
          year_input.insertAdjacentElement("afterend", errorSpan);
        } else {
          heading.textContent = year_input.value;
          errorSpan.textContent = "";
          errorSpan.style.display = "none";
          const calendar_container = makeCalendarUI(Number(year_input.value));
          thisYear = Number(year_input.value);
          year_input.style.display = "none";
          root.append(calendar_container);
        }
      }
    }
  });
});

let firstDayOfTheMonth = 1;
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
const makeCalendarUI = (user_input_year) => {
  const year = user_input_year;
  calendar.classList.add("calendar");
  for (let month = 0; month < 12; month++) {
    const calendarMonth = makeCalendarMonthUI(year, month);
    calendar.append(calendarMonth);
  }
  return calendar;
};

const makeCalendarMonthUI = (year, month_no) => {
  firstDayOfTheMonth = 1;
  const today = new Date(year, month_no, 1).getDay();
  const no_of_days = new Date(year, month_no + 1, 0).getDate();
  const month = document.createElement("div");
  const month_name = document.createElement("span");
  month.classList.add("month");
  month_name.textContent = months[month_no];
  month_name.classList.add("month_name");
  const columns = table_columns();
  const weeks = month_days(no_of_days, today, month_no);
  month.append(month_name, columns, weeks);
  return month;
};

const number_of_weeks = (no_of_days, today) => {
  return Math.ceil((no_of_days + today) / 7);
};
const table_columns = () => {
  const days = Object.freeze({
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  });
  const columns = document.createElement("div");
  columns.classList.add("day");
  for (let j = 0; j < 7; j++) {
    const day = document.createElement("span");
    day.textContent = days[j];
    columns.append(day);
  }
  return columns;
};
const month_days = (no_of_days, today, month_no) => {
  const weeks = document.createElement("div");
  weeks.classList.add("weeks");
  for (let i = 0; i < number_of_weeks(no_of_days, today); i++) {
    const week = table_row(i, no_of_days, today, month_no);
    weeks.append(week);
  }
  return weeks;
};
const table_row = (week_no, no_of_days, today, month_no) => {
  const weekDiv = document.createElement("div");
  weekDiv.classList.add("week");
  for (let i = 7 * week_no; i < 7 * (week_no + 1); i++) {
    const day_button = document.createElement("button");
    if (i > no_of_days + today - 1 || i < today) {
      day_button.textContent = "";
      day_button.disabled = true;
    } else {
      day_button.addEventListener("click", (e) => selectDate(e, month_no));
      day_button.textContent = firstDayOfTheMonth;
      day_button.classList.add("today");
      firstDayOfTheMonth++;
    }
    weekDiv.append(day_button);
  }
  return weekDiv;
};
function selectDate(e, month_no) {
  const day = e.target.textContent;
  const month = months[month_no];
  const year = thisYear;
  const selected_day = new Date(year, month_no, day);
  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Confirm";
  confirmBtn.classList.add("confirm-btn");
  heading.insertAdjacentElement("afterend", confirmBtn);
  heading.textContent = `See you on ${day} of ${month}, ${year}`;
  confirmBtn.addEventListener("click", (e) => confirmDate(e));
  console.log(selected_day);
}
function confirmDate(e) {
  calendar.style.display = "none";
  e.target.style.display = "none";
  root.classList.add("she_said_yes");
}
