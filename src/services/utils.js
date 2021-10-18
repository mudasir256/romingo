const getDateTime = function (isoString) {
  var date = new Date(isoString);
  var year = date.getFullYear();
  // var monthArray = ['Jan', 'Feb', "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // var month = monthArray[date.getMonth()];
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = ("0" + date.getHours()).slice(-2);
  var minute = ("0" + date.getMinutes()).slice(-2);
  var am = "am";

  if (hour > 12) {
    hour = hour - 12;
    am = "pm";
  }

  return `${month}/${day}/${year} ${hour}:${minute} ${am}`;
};

const getFormatDate = function (str) {
  const date = new Date(str);
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;
};

const getDateNow = function () {
  const date = new Date();
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;
};

const getOnlyDate = function (isoString) {
  var date = new Date(isoString);
  var monthArray = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  var month = monthArray[date.getMonth()];
  var day = date.getDate();

  return `${month} ${day}`;
};

const getDateFull = function (isoString) {
  var date = new Date(isoString);
  var monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month = monthArray[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

const meterToMile = function (meters) {
  let mile = meters / 1609;

  return mile.toFixed(1);
};

export const utils = {
  getDateTime,
  getOnlyDate,
  getDateNow,
  getFormatDate,
  getDateFull,
  meterToMile,
};
