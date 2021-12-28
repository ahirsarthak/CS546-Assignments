const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data;
}

async function getStockById(id) {
  if (!id && id !== 0) {
    throw "Enter valid ID";
  }

  const people = await getPeople();
  if (id > people.length || id < 0) {
    throw "Invalid ID";
  }
  person = people.find((person) => person.id === id);

  if (!person) {
    throw "Stock not in records";
  }
  return person;
}

module.exports = {
  getStockById,
  getPeople,
};
