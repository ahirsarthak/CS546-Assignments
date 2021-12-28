const mongoCollections = require("../config/mongoCollections");
const rest = mongoCollections.restaurants; //create and get the restCollection

let { ObjectId } = require("mongodb");
var ObjectID = require("mongodb").ObjectId;

async function getAll() {
  const restCollection = await rest();
  const arrOfrest = await restCollection.find({}).toArray();
  let arrRet = [];
  let restObj = {};
  for (let i = 0; i < arrOfrest.length; i++) {
    restObj = {};
    restObj._id = arrOfrest[i]._id.toString();
    restObj.name = arrOfrest[i].name;
    arrRet.push(restObj);
  }
  return arrRet;
}
async function create(
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  //overallRating,
  serviceOptions
) {
  if (priceRange.length < 1 || priceRange.length > 4)
    throw "Price is not inrange";

  if (name === undefined || name == null || typeof name != "string") {
    throw "Bad input for name";
  }
  if (
    location === undefined ||
    location == null ||
    typeof location != "string"
  ) {
    throw "Bad input for location type.";
  }
  if (
    phoneNumber === undefined ||
    phoneNumber == null ||
    typeof phoneNumber != "string"
  ) {
    throw "Bad input for phone number type.";
  }
  if (website === undefined || website == null || typeof website != "string") {
    throw "Bad input for website  type.";
  }
  if (
    priceRange === undefined ||
    priceRange == null ||
    typeof priceRange != "string"
  ) {
    throw "Bad input for price range type.";
  }
  if (
    typeof serviceOptions === "object" &&
    typeof serviceOptions.dineIn !== "boolean"
  )
    throw "ERROR -  Service Option  DINE IN is not a boolean";
  if (
    !serviceOptions.dineIn &&
    !serviceOptions.takeOut &&
    !serviceOptions.delivery
  )
    throw `Error: no service option specified`;

  if (
    typeof serviceOptions === "object" &&
    typeof serviceOptions.takeOut !== "boolean"
  )
    throw "ERROR -  Service Option  takeOutis not a boolean";

  if (
    typeof serviceOptions === "object" &&
    typeof serviceOptions.delivery !== "boolean"
  )
    throw "ERROR -  Service Option  deliveryis not a boolean";
  if (!Array.isArray(cuisines) || cuisines.length == 0)
    throw "Cusines is not an array.";
  if (cuisines === undefined || cuisines == null) {
    throw "Bad input for cuisines type.";
  }
  if (!Array.isArray(cuisines)) throw `Error: cuisines is not an array`;
  if (cuisines.length === 0) throw `Error: cuisines array is empty`;
  if (serviceOptions == null) {
    throw "Bad input for service options type.";
  }

  const phoneNoCheck = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
  const phoneCheck = phoneNoCheck.test(phoneNumber);
  if (phoneCheck == false) throw "Wrong Phone no. format";

  const urlCheck =
    /(http):\/\/(www.)(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const websitecheck = urlCheck.test(website);
  if (websitecheck == false) throw "Wrong website format";

  const restCollection = await rest();

  const newRestaurant = {
    name: name,
    location: location,
    phoneNumber: phoneNumber,
    website: website,
    priceRange: priceRange,
    cuisines: cuisines,
    overallRating: 0,
    serviceOptions: serviceOptions,

    reviews: [],
  };

  const insertRest = await restCollection.insertOne(newRestaurant);
  if (insertRest.insertedCount === 0)
    throw "Cannot add restaurant into restCollection of DB";

  let restId = insertRest.insertedId;
  restId = restId.toString();

  return await this.get(restId);
}

async function get(id) {
  if (!id) throw "You must provide an id to get";
  if (typeof id !== "string" || id.length === 0)
    throw " the id must be string type and not an empty string";

  if (id === undefined || id === null) throw "Error: string does not exist";
  const check1 = ObjectID.isValid(id);
  if (check1 == false) throw "enter valid id";
  id = ObjectId(id).valueOf();

  const restCollection = await rest();
  let restaurant = await restCollection.findOne({ _id: id }); //return a document
  if (restaurant === null) throw "No restaurant with that restaurantId";
  restaurant._id = restaurant._id.toString();
  return restaurant;
}

async function update(
  id,
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  serviceOptions
) {
  if (typeof id !== "string" || id.length === 0)
    throw "the id must be string type and not an empty string";
  if (id === undefined || id === null) throw "Error: string does not exist";
  if (typeof id !== "string") throw `Error: ${id} is not of type string`;
  if (id.trim().length === 0) throw `String just whitespace`;
  id = id.trimStart();
  if (name === undefined || name == null) {
    throw "Bad input for name";
  }

  if (!id) throw "You must provide an Id for removing";
  if (typeof id !== "string" || id.length === 0)
    throw "the id must be string type and not an empty string";
  if (!ObjectID.isValid(id)) throw "the id provided is not a valid ObjectId";

  const updateRestaurant = {
    name: name,
    location: location,
    phoneNumber: phoneNumber,
    website: website,
    priceRange: priceRange,
    //  overallRating: overallRating,
    cuisines: cuisines,
    serviceOptions: serviceOptions,
  };
  let parsedId = ObjectId(id);
  const restaurantsCollection = await rest();

  const updateInfo = await restaurantsCollection.updateOne(
    { _id: parsedId },
    { $set: name },

    { $set: location },
    { $set: phoneNumber },
    { $set: website },
    { $set: priceRange },
    // { $set: overallRating },
    { $set: cuisines },
    { $set: serviceOptions }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `Error: Updated is failed`;

  id = "" + id;
  return await this.get(id);
}

async function remove(id) {
  if (typeof id !== "string" || id.length === 0)
    throw "the id must be string type and not an empty string";

  const check2 = ObjectID.isValid(id);
  if (check2 == false) throw "enter valid id";
  if (id === undefined || id === null) throw "Error: string does not exist";
  if (!id) throw "You must provide an id to search for";
  id = ObjectId(id).valueOf();
  let parsedId = ObjectId(id);

  const restCollection = await rest();
  const deleteRest = await restCollection.deleteOne({ _id: parsedId });
  if (deleteRest.deletedCount === 0) {
    throw "Cannot delete restaurant with restaurantId";
  }

  // prettier-ignore

  return deleteRest;
}

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
};
