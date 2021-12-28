const axios = require("axios");
const util = (require("util").inspect.defaultOptions.depth = null);

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data;
}
async function getPersonById(id) {
  if (!id && id !== 0) {
    throw "Enter valid ID";
  }

  const people = await getPeople();
  if (id > people.length || id < 0) {
    throw "Invalid ID";
  }
  person = people.find((person) => person.id === id);

  if (!person) {
    throw "Person not in records";
  }
  return person;
}

async function sameStreet(streetName, streetSuffix) {
  if (typeof streetName != "string" || typeof streetSuffix != "string") {
    throw new Error("Enter a valid street name of street suffix");
  }
  if (
    !streetName ||
    !streetSuffix ||
    streetName.trim() == "" ||
    streetSuffix.trim() === ""
  ) {
    throw new Error("street name and street suffix must not be empty");
  }

  const data = await getPeople();
  const filteredData = data.filter(
    (value) =>
      (value.address.home.street_name.toLowerCase() ==
        streetName.toLowerCase() &&
        value.address.home.street_suffix.toLowerCase() ==
          streetSuffix.toLowerCase()) ||
      (value.address.work.street_name.toLowerCase() ==
        streetName.toLowerCase() &&
        value.address.work.street_suffix.toLowerCase() ==
          streetSuffix.toLowerCase())
  );
  if (filteredData.length < 2) {
    throw new Error("Less than two people live here");
  }
  return filteredData;
}

async function manipulateSsn() {
  const data = await getPeople();

  const arr = data.map(function (d) {
    const trimmed = d.ssn.replace(/-/g, "");

    const arrayOfNumbers = trimmed.split("");

    const sorted = arrayOfNumbers.sort(function (current, next) {
      return current - next;
    });

    const mergedNumber = sorted.join("");

    const numericSsn = parseInt(mergedNumber);

    const obj = {
      firstName: d.first_name,
      lastName: d.last_name,
      numericSsn,
    };

    return obj;
  });

  const highest = Math.max(
    ...arr.map(function (d) {
      return d.numericSsn;
    })
  );

  const lowest = Math.min(
    ...arr.map(function (d) {
      return d.numericSsn;
    })
  );

  const average = Math.floor(
    arr.reduce(function (sum, d) {
      return sum + d.numericSsn;
    }, 0) / arr.length
  );

  const highestPerson = arr.filter(function (d) {
    return d.numericSsn === highest;
  });

  const lowestPerson = arr.filter(function (d) {
    return d.numericSsn === lowest;
  });

  const result = {
    highest: {
      firstName: highestPerson[0].firstName,
      lastName: highestPerson[0].lastName,
    },

    lowest: {
      firstName: lowestPerson[0].firstName,
      lastName: lowestPerson[0].lastName,
    },

    average,
  };

  return result;
}

async function sameBirthday(month, day) {
  if (month == null) {
    throw new Error("Month can't be null!");
  }
  if (day == null) {
    throw new Error("Day can't be null!");
  }

  if (typeof month != "string" && typeof month != "number") {
    throw new Error("Month should either be a valid number or a valid string");
  }
  if (typeof day != "string" && typeof day != "number") {
    throw new Error("Day should either be a valid number or a valid string");
  }

  if (typeof month == "string") {
    month = parseInt(month);
  }
  if (isNaN(month) || month < 1 || month > 12) {
    throw new Error("Month should either be between 1-12");
  }

  if (typeof day == "string") {
    day = parseInt(day);
  }
  if (isNaN(day)) {
    throw new Error("Given Day is not valid");
  }
  const validMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1 || day > validMonthDays[month - 1]) {
    throw new Error(`The day ${day} is not valid for the month ${month}`);
  }

  const data = await getPeople();
  let result = [];
  for (let i = 0; i < data.length; i++) {
    let birthdate = data[i]["date_of_birth"];
    const [birthMonth, birthDay] = birthdate
      .split("/")
      .map((item) => parseInt(item));
    if (birthDay === day && birthMonth === month) {
      result.push(data[i]["first_name"] + " " + data[i]["last_name"]);
    }
  }

  if (result.length === 0) {
    throw new Error(`No people with birthday on ${day} of month ${month}`);
  }

  return result;
}

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday,
};
