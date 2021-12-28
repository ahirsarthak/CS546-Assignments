const axios = require("axios");

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
module.exports = {
  getPersonById,
  getPeople,
};
