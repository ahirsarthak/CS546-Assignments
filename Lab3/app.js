const people = require("./people");
const stocks = require("./stocks");

async function main() {
  try {
    console.log("ID");
    const peopledata = await people.getPersonById(
      "7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"
    );
    console.log(peopledata);
    console.log("----------------------------------------------------");
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("Same Street");
    const peopledata = await people.sameStreet("Sutherland", "Point");
    console.log(peopledata);
    console.log("----------------------------------------------------");
  } catch (e) {
    console.log(e);
  }

  console.log("Manipulated SSN");
  const peopledata = await people.manipulateSsn();
  console.log(peopledata);
  console.log("----------------------------------------------------");

  try {
    console.log("Same Birthday");
    const peopledata = await people.sameBirthday(09, 25);
    console.log(peopledata);
    console.log("----------------------------------------------------");
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("List Share Holders");

    const stockdata = await stocks.listShareholders();
    console.log(stockdata);
    console.log("----------------------------------------------------");
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("Top Shareholder");

    const stockdata = await stocks.topShareHolder(
      "Aeglea BioTherapeutics, Inc."
    );

    console.log(stockdata);
    console.log("----------------------------------------------------");
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("List Stocks");

    const stockdata = await stocks.listStocks("Grenville", "Pawelke");
    console.log(stockdata);
    console.log("----------------------------------------------------");
  } catch (e) {
    console.log(e);
  }

  try {
    console.log("Get Stocks by ID");

    const stockdata = await stocks.getStockById(
      "f652f797-7ca0-4382-befb-2ab8be914ff0"
    );
    console.log(stockdata);
    console.log("----------------------------------------------------");
  } catch (e) {
    console.log(e);
  }
}

//call main
main();
