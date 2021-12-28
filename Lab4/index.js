const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

const main = async () => {
  const safrronLounge = await restaurants.create(
    "The Saffron Lounge",
    "New York City, New York",
    "123-456-7890",
    "http://www.saffronlounge.com",
    "$$$$",
    ["Cuban", "Italian"],
    3,
    { dineIn: true, takeOut: true, delivery: false }
  );
  console.log(safrronLounge);
  const safrronLounge1 = await restaurants.create(
    "NYC Lounge",
    "New Jersey City, New York",
    "122-345-3245",
    "http://www.nyclounge.com",
    "$$$",
    ["CHinese", "Indian"],
    3,
    { dineIn: true, takeOut: true, delivery: true }
  );
  //console.log(safrronLounge1);

  const allResturants = await restaurants.getAll();
  console.log(allResturants);

  const safrronLounge2 = await restaurants.create(
    "Mix",
    "Mix city, York",
    "232-324-5343",
    "http://www.mixone.com",
    "$$",
    ["CHinese", "India", "Cuban", "Italian"],
    3,
    { dineIn: true, takeOut: true, delivery: true }
  );
  console.log(safrronLounge2);
  const renamedLounge = await restaurants.rename(
    "615d1c0df0a77e8e0f27ac7b",
    "http://www.hellso.com"
  );
  console.log(renamedLounge);
  const removeSecond = await restaurants.remove("615d18ee8316d4336491a37b");
  console.log(removeSecond);

  const allResturants1 = await restaurants.getAll();
  console.log(allResturants1);

  try {
    const badone = await restaurants.create(
      "dsd",
      "New York City, New York",
      "123-456-70",
      "http://www.saffronlounge.com",
      "$$$$",
      ["Cuban", "Italian"],
      3,
      { dineIn: true, takeOut: true, delivery: false }
    );
    console.log(safrronLounge);
  } catch (e) {
    console.log(e);
  }
  try {
    const errorRemove = await restaurants.remove("615d195fa75cb91266fda788");
    console.log(errorRemove);
  } catch (e) {
    console.log(e);
  }

  try {
    const ErrorRename = await restaurants.rename(
      "615b892bebbee44f3f1187ed",
      "http://www.newname.com"
    );
    console.log(ErrorRename);
  } catch (e) {
    console.log(e);
  }
  try {
    const ErrorRename = await restaurants.rename(
      "615b892bebbee44f3fb187ec",
      "www.newname.com"
    );
    console.log(ErrorRename);
  } catch (e) {
    console.log(e);
  }
  try {
    const pizzaLounge = await restaurants.get("204adw77bcf86cd799439011");
    console.log(pizzaLounge);
  } catch (e) {
    console.log(e);
  }
};
main().catch((error) => {
  console.log(error);
});
