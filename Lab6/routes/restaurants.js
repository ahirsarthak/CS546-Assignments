const express = require("express");
const router = express.Router();
const data = require("../data");
const restData1 = data.restaurants;

router.get("/", async (req, res) => {
  try {
    const rest_list = await restData1.getAll();
    res.json(rest_list);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  let restData = req.body;
  if (!Array.isArray(restData.cuisines) || restData.cuisines.length == 0) {
    res.status(400).json({ error: "Cusines is not an array" });
    return;
  }
  if (restData.priceRange.length < 1 || restData.priceRange.length > 4) {
    res.status(400).json({ error: "Price is not inrange" });
    return;
  }
  if (
    restData.name === undefined ||
    restData.name == null ||
    typeof restData.name != "string"
  ) {
    res.status(400).json({ error: "Bad input for name" });
    return;
  }
  if (
    restData.location === undefined ||
    restData.location == null
    //||
    // typeof restData.location != "string"
  ) {
    res.status(400).json({ error: "Bad input for location type" });
    return;
  }
  if (
    restData.phoneNumber === undefined ||
    restData.phoneNumber == null ||
    typeof restData.phoneNumber != "string"
  ) {
    res.status(400).json({ error: "Bad input for phone number type." });
    return;
  }
  if (
    restData.website === undefined ||
    restData.website == null ||
    typeof restData.website != "string"
  ) {
    res.status(400).json({ error: "Bad input for website  type" });
    return;
  }
  if (
    restData.priceRange === undefined ||
    restData.priceRange == null ||
    typeof restData.priceRange != "string"
  ) {
    res.status(400).json({ error: "Bad input for price range type." });
    return;
  }
  if (
    typeof restData.serviceOptions === "object" &&
    typeof restData.serviceOptions.dineIn !== "boolean"
  ) {
    res
      .status(400)
      .json({ error: "ERROR -  Service Option  DINE IN is not a boolean" });
    return;
  }
  if (
    typeof restData.serviceOptions === "object" &&
    typeof restData.serviceOptions.takeOut !== "boolean"
  ) {
    res
      .status(400)
      .json({ error: "ERROR -  Service Option  takeOut is not a boolean" });
    return;
  }

  if (
    typeof restData.serviceOptions === "object" &&
    typeof restData.serviceOptions.delivery !== "boolean"
  ) {
    res
      .status(400)
      .json({ error: "ERROR -  Service Option  delivery  is not a boolean" });
    return;
  }

  if (restData.cuisines === undefined || restData.cuisines == null) {
    res.status(400).json({ error: "ERROR -  Bad input for cuisines type." });
    return;
  }
  if (!Array.isArray(restData.cuisines)) {
    res.status(400).json({ error: "ERROR -  Error: cuisines is not an array" });
    return;
  }

  if (restData.cuisines.length === 0) {
    res.status(400).json({ error: "ERROR -  Error: cuisines array is empty" });
    return;
  }
  if (restData.serviceOptions == null) {
    res
      .status(400)
      .json({ error: "ERROR -  Bad input for service options type" });
    return;
  }
  if (
    !restData.serviceOptions.dineIn &&
    !restData.serviceOptions.takeOut &&
    !restData.serviceOptions.delivery
  ) {
    res
      .status(400)
      .json({ error: "Bad input Error: no service option specified" });
    return;
  }
  if (
    restData.serviceOptions === undefined ||
    restData.serviceOptions == null
  ) {
    res.status(400).json({ error: "Bad input for serviceOptions type" });
    return;
  }
  const phoneNoCheck = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
  const phoneCheck = phoneNoCheck.test(restData.phoneNumber);
  if (phoneCheck == false) {
    res.status(400).json({ error: "Wrong Phone no. format" });
    return;
  }
  const urlCheck =
    /(http):\/\/(www).(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const websitecheck = urlCheck.test(restData.website);
  if (websitecheck == false) {
    res.status(400).json({ error: "Wrong website formaqt" });
    return;
  }

  try {
    const createdrestaurant = await restData1.create(
      restData.name,
      restData.location,
      restData.phoneNumber,
      restData.website,
      restData.priceRange,
      restData.cuisines,
      restData.serviceOptions
    );
    res.status(200).json(createdrestaurant);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  //get a specific restaurant with _id
  try {
    const restaurant = await restData1.get(req.params.id);
    res.status(200).json(restaurant);
  } catch (e) {
    res.status(404).json({ message: "restaurant not found" });
    return;
  }
});

router.put("/:id", async (req, res) => {
  let restData = req.body;
  if (!Array.isArray(restData.cuisines) || restData.cuisines.length == 0) {
    res.status(400).json({ error: "Cusines is not an array" });
    return;
  }
  if (restData.priceRange.length < 1 || restData.priceRange.length > 4) {
    res.status(400).json({ error: "Price is not inrange" });
    return;
  }
  if (
    restData.name === undefined ||
    restData.name == null ||
    typeof restData.name != "string"
  ) {
    res.status(400).json({ error: "Bad input for name" });
    return;
  }
  if (
    restData.location === undefined ||
    restData.location == null ||
    typeof restData.location != "string"
  ) {
    res.status(400).json({ error: "Bad input for location type" });
    return;
  }
  if (
    restData.phoneNumber === undefined ||
    restData.phoneNumber == null ||
    typeof restData.phoneNumber != "string"
  ) {
    res.status(400).json({ error: "Bad input for phone number type." });
    return;
  }
  if (
    restData.website === undefined ||
    restData.website == null ||
    typeof restData.website != "string"
  ) {
    res.status(400).json({ error: "Bad input for website  type" });
    return;
  }
  if (
    restData.priceRange === undefined ||
    restData.priceRange == null ||
    typeof restData.priceRange != "string"
  ) {
    res.status(400).json({ error: "Bad input for price range type." });
    return;
  }
  if (
    typeof restData.serviceOptions === "object" &&
    typeof restData.serviceOptions.dineIn !== "boolean"
  ) {
    res
      .status(400)
      .json({ error: "ERROR -  Service Option  DINE IN is not a boolean" });
    return;
  }
  if (
    typeof restData.serviceOptions === "object" &&
    typeof restData.serviceOptions.takeOut !== "boolean"
  ) {
    res
      .status(400)
      .json({ error: "ERROR -  Service Option  takeOut is not a boolean" });
    return;
  }

  if (
    typeof restData.serviceOptions === "object" &&
    typeof restData.serviceOptions.delivery !== "boolean"
  ) {
    res
      .status(400)
      .json({ error: "ERROR -  Service Option  delivery  is not a boolean" });
    return;
  }

  if (restData.cuisines === undefined || restData.cuisines == null) {
    res.status(400).json({ error: "ERROR -  Bad input for cuisines type." });
    return;
  }
  if (!Array.isArray(restData.cuisines)) {
    res.status(400).json({ error: "ERROR -  Error: cuisines is not an array" });
    return;
  }

  if (restData.cuisines.length === 0) {
    res.status(400).json({ error: "ERROR -  Error: cuisines array is empty" });
    return;
  }
  if (restData.serviceOptions == null) {
    res
      .status(400)
      .json({ error: "ERROR -  Bad input for service options type" });
    return;
  }
  if (
    !restData.serviceOptions.dineIn &&
    !restData.serviceOptions.takeOut &&
    !restData.serviceOptions.delivery
  ) {
    res
      .status(400)
      .json({ error: "Bad input Error: no service option specified" });
    return;
  }
  if (
    restData.serviceOptions === undefined ||
    restData.serviceOptions == null
  ) {
    res.status(400).json({ error: "Bad input for serviceOptions type" });
    return;
  }
  const phoneNoCheck = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
  const phoneCheck = phoneNoCheck.test(restData.phoneNumber);
  if (phoneCheck == false) {
    res.status(400).json({ error: "Wrong Phone no. format" });
    return;
  }
  const urlCheck =
    /(http):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const websitecheck = urlCheck.test(restData.website);
  if (websitecheck == false) {
    res.status(400).json({ error: "Wrong website format" });
    return;
  }

  try {
    //check whether the restaurant with that Id is exist
    const restaurant = await restData1.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "restaurant not found" });
    return;
  }
  try {
    const updatedrestaurant = await restData1.update(req.params.id, restData);
    res.status(200).json(updatedrestaurant);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json({ error: "You must supply an RestaurantId to delete" });
    return;
  }

  try {
    await restData1.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "restaurant not found with this id" });
    return;
  }

  try {
    await restData1.remove(req.params.id);
    // prettier-ignore

    res.status(200).json({ "restaurantId": req.params.id, "deleted": true });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
