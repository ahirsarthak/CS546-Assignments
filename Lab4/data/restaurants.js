const mongoCollections = require("../config/mongoCollections");
const restaurantDB = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");
var ObjectID = require("mongodb").ObjectId;

module.exports = {
  async get(id) {
    if (id === undefined || id === null) throw "Error: string does not exist";
    if (!id) throw "You must provide an id to search for";
    const check1 = ObjectID.isValid(id);
    if (check1 == false) throw "enter valid id";
    id = ObjectId(id).valueOf();
    const restCollection = await restaurantDB();
    const restaurantGetID = await restCollection.findOne({ _id: id });

    if (!restaurantGetID) throw "No restaurant with that id";
    restaurantGetID["_id"] = "" + restaurantGetID["_id"].toString();

    return restaurantGetID;
  },

  async getAll() {
    const restCollection = await restaurantDB();

    const restaurantList = await restCollection.find({}).toArray();
    restaurantList.forEach((value) => {
      value["_id"] = "" + value["_id"].toString();
    });
    return restaurantList;
  },

  async create(
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions
  ) {
    if (!Array.isArray(cuisines) || cuisines.length == 0)
      throw "Cusines is not an array";
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
    if (
      website === undefined ||
      website == null ||
      typeof website != "string"
    ) {
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
      typeof serviceOptions === "object" &&
      typeof serviceOptions.takeOut !== "boolean"
    )
      throw "ERROR -  Service Option  takeOutis not a boolean";

    if (
      typeof serviceOptions === "object" &&
      typeof serviceOptions.delivery !== "boolean"
    )
      throw "ERROR -  Service Option  deliveryis not a boolean";

    if (cuisines === undefined || cuisines == null) {
      throw "Bad input for cuisines type.";
    }
    if (!Array.isArray(cuisines)) throw `Error: cuisines is not an array`;
    if (cuisines.length === 0) throw `Error: cuisines array is empty`;
    if (serviceOptions == null) {
      throw "Bad input for service options type.";
    }
    if (overallRating == null) {
      throw "Bad input for overall rating type.";
    }
    if (serviceOptions === undefined || serviceOptions == null) {
      throw "Bad input for serviceOptions type.";
    }
    if (typeof serviceOptions !== "object" || serviceOptions === null)
      throw `Error: ${serviceOptions} is not an object`;
    const phoneNoCheck = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    const phoneCheck = phoneNoCheck.test(phoneNumber);
    if (phoneCheck == false) throw "Wrong Phone no. format";

    const urlCheck =
      /(http):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    const websitecheck = urlCheck.test(website);
    if (websitecheck == false) throw "Wrong website format";

    const restCollection = await restaurantDB();

    let newRestaurant = {
      name: name,
      location: location,
      phoneNumber: phoneNumber,
      website: website,
      priceRange: priceRange,
      cuisines: cuisines,
      overallRating: overallRating,
      serviceOptions: serviceOptions,
    };

    const insertInfo = await restCollection.insertOne(newRestaurant);
    if (insertInfo.insertedCount === 0) throw "Could not add rest";

    const newId = insertInfo.insertedId;

    const rest = await this.get(newId);

    return rest;
  },

  async remove(id) {
    const check2 = ObjectID.isValid(id);
    if (check2 == false) throw "enter valid id";
    if (id === undefined || id === null) throw "Error: string does not exist";
    if (!id) throw "You must provide an id to search for";
    id = id.trimStart();
    id = ObjectId(id).valueOf();
    const restCollection = await restaurantDB();
    const sert = await restCollection.findOne({ _id: id });
    if (sert === null) throw "ID not found";
    const q = sert["name"];
    id = ObjectId(id).valueOf();

    const deletionInfo = await restCollection.deleteOne({ _id: id });
    if (!deletionInfo) throw "No rest with that id";

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete rest with id of ${id} Invalid ID`;
    }
    return `${q} has been successfully deleted.`;
  },

  async rename(id, newWebsite) {
    const check3 = ObjectID.isValid(id);
    if (check3 == false) throw "enter valid id";

    if (id === undefined || id === null) throw "Error: string does not exist";
    if (!id) throw "You must provide an id to search for";

    if (!newWebsite) throw "You must provide an array of breeds";

    if (newWebsite.length === 0) throw "You must provide at least one breed.";
    const urlCheck =
      /(http):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    const websitecheck = urlCheck.test(newWebsite);

    if (websitecheck == false) throw "Wrong website format";
    const restCollection = await restaurantDB();
    id = ObjectId(id).valueOf();
    const check9 = await restCollection.findOne({ _id: id });
    if (check9 === null) throw "enter valid id";
    if (check9.website === newWebsite) throw "Enter new website link ";
    const updatedInfo = await restCollection.updateOne(
      { _id: id },
      { $set: { website: newWebsite } }
    );
    if (!updatedInfo) throw "No rest with that id";

    if (updatedInfo.modifiedCount === 0) {
      throw "could not update rest successfully - Invalid ID";
    }

    return await this.get(id.toString());
  },
};
