var axios = require("axios");
const util = (require("util").inspect.defaultOptions.depth = null);

async function getData() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data;
}
async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data;
}

function getPersonById(peopleData, personId) {
  for (let person of peopleData) {
    if (person["id"] === personId) {
      return person;
    }
  }
}

async function listShareholders() {
  if (arguments.length !== 0) {
    throw new Error("listShareholders does not take any parameter");
  }

  let peopleData;
  let stocksData;
  try {
    peopleData = await getPeople();
    stocksData = await getData();
  } catch (err) {
    console.log(err.message);
    return;
  }

  let result = [];
  for (let stock of stocksData) {
    let shareholders = stock["shareholders"];
    let shareholderData = [];
    for (let shareholder of shareholders) {
      let shareholderId = shareholder["userId"];
      let numberOfShares = shareholder["number_of_shares"];

      let person = getPersonById(peopleData, shareholderId);

      shareholderData.push({
        first_name: person["first_name"],
        last_name: person["last_name"],
        number_of_shares: numberOfShares,
      });
    }

    let item = {
      id: stock["id"],
      stock_name: stock["stock_name"],
      shareholders: shareholderData,
    };
    result.push(item);
  }
  return result;
}

async function topShareHolder(stockName) {
  await axios
    .get(
      "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
    )
    .then(function (response) {
      if (
        isNaN(stockName) === false ||
        stockName === undefined ||
        stockName.length === undefined
      ) {
        console.log("Error, enter a valid stock name");
      } else {
        const k = response.data;

        const size = Object.keys(k).length;

        let num = 0;
        let t = 0;
        let numbers_shares = [];
        let userIdOfShares = [];

        for (let i = 0; i < size; i++) {
          if (k[i]["stock_name"] !== stockName) {
            num = num + 1;
          } else if (k[i]["stock_name"] == stockName) {
            const p = k[i]["shareholders"];

            for (let m = 0; m < Object.keys(k[i]["shareholders"]).length; m++) {
              numbers_shares.push(p[m]["number_of_shares"]);
              userIdOfShares.push(p[m]["userId"]);
            }

            if (Object.keys(k[i]["shareholders"]).length == 0) {
              console.log(`${stockName} current has no shareholders.`);
              t = t + 1;
            }
          }
        }

        if (num == 1000) {
          console.log("No stock with that name");
        } else if (t == 0) {
          const largestShare = Math.max(...numbers_shares);
          const indexHighestShare = numbers_shares.indexOf(largestShare);
          console.log(
            `With ${largestShare} in ${stockName}, ${userIdOfShares[indexHighestShare]} is the top shareholder.`
          );
        }
      }
    });
}

async function getStocksByUserId(id) {
  var stocks = await getData();

  var userStocks = stocks.reduce(function (arr, stock) {
    var shareholders = stock.shareholders;

    if (shareholders.length > 0) {
      var share = shareholders.find(function (e) {
        return e.userId === id;
      });

      if (share) {
        var userStock = {
          stock_name: stock.stock_name,
          number_of_shares: share.number_of_shares,
        };

        arr.push(userStock);
      }
    }

    return arr;
  }, []);

  return userStocks;
}
async function listStocks(firstName, lastName) {
  if (!firstName) throw new Error("The firstName parameter is missing!");
  if (!lastName) throw new Error("The lastName parameter is missing!");

  if (typeof firstName !== "string")
    throw new Error("firstName is not a string");
  if (typeof lastName !== "string") throw new Error("lastName is not a string");

  if (firstName.trim().length === 0)
    throw new Error(firstName + " is an empty string!");
  if (lastName.trim().length === 0)
    throw new Error(lastName + " is an empty string!");

  var people = await getPeople();

  var person = people.find(function (p) {
    return p.first_name === firstName && p.last_name === lastName;
  });

  var fullName = firstName + " " + lastName;

  if (!person) throw new Error(fullName + " is not in people.json!");

  var shares = await getStocksByUserId(person.id);

  if (shares.length === 0)
    throw new Error(fullName + " does not own any share!");

  console.log(shares);
}
async function main() {
  try {
    const peopledata = await listStocks("Grenville", "Pawelke");
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
}

//call main

async function getStockById(id) {
  if (!id && id !== 0) {
    throw "Enter valid ID";
  }

  const people = await getData();
  if (id > people.length || id < 0) {
    throw "Invalid ID";
  }
  person = people.find((person) => person.id === id);

  if (!person) {
    throw "Person not in records";
  }
  return person;
}
module.exports = {
  listShareholders,
  listStocks,
  topShareHolder,
  getStockById,
};
