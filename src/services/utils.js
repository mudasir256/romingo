const formatChildren = function (occupants) {
  if (occupants.childrenAge) {
    return occupants.childrenAge.map((x: number) => {
      if (x === 0) {
        return {
          age: 1,
        };
      }
      return {
        age: x,
      };
    })
  } else {
    return []
  }
}

export const formatUnixLong = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}
export const formatUnix = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US')
}

export const findReservationStatus = (checkInTime, reservationStatus) => {
  //TODO: send back 'upcoming', 'cancelled', 'current', 'past'
  if (reservationStatus === 'cancelled') {
    return 'cancelled'
  }

  const differenceInTime = new Date(checkInTime).getTime() - new Date().getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays > 1) {
    return 'upcoming'
  } else if (differenceInDays < 0) {
    return 'past'
  } else if (differenceInDays == 0) {
    return 'current'
  }
}

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function computePetFeePolicyTotalFees(durationDays, dogs, petFeePolicy) {
  try {
    if (petFeePolicy === {}) {
      return 0;
    }
    if (dogs < 1) {
      return 0;
    }

    
    const nights = durationDays;

    if (nights < 1) {
      return 0;
    }

    // if (petFeePolicy.maxPets !== -1) {
    //   if (dogs > petFeePolicy.maxPets) {
    //     return -1;
    //   }
    // }

    if (nights > 365) {
      return -1;
    }

    let keys = Object.keys(petFeePolicy.breakup);

    //BUG: 5 being added somehow?
    if (keys.indexOf('5') > -1) {
      keys.splice(0, 1)
    }

    for (let i = 0; i < keys.length; i++) {
      keys[i] = parseInt(keys[i]);
    }

    keys = keys.sort((a, b) => {
      a - b;
    });

    const values = [];

    for (let i = 0; i < keys.length; i++) {
      values.push(petFeePolicy.breakup[keys[i].toString()]);
    }

    let retVal;

    if (petFeePolicy.perNight) {
      for (let i = 0; i < keys.length; i++) {
        if (nights <= keys[i]) {
          if (values[i] === -1) {
            return -1;
          }
          retVal = 0;
          let prevKey = 0;
          let newNights = 0;
          for (let j = 0; j <= i; j++) {
            if (j === i) {
              newNights = nights - prevKey;
            } else {
              newNights = keys[j] - prevKey;
            }
            prevKey = keys[j];
            if (petFeePolicy.perPet) {
              retVal = retVal + newNights * dogs * values[j];
            } else {
              retVal = retVal + newNights * values[j];
            }
          }
          return retVal;
        }
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (nights <= keys[i]) {
          retVal = values[i];
          if (retVal === -1) {
            return retVal;
          }
          if (petFeePolicy.perPet) {
            retVal = retVal * dogs;
          }
          return retVal;
        }
      }
    }
  } catch (e) {
    console.error(e);
    return -1;
  }
}

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
  formatChildren,
  computePetFeePolicyTotalFees,
  slugify,
};
