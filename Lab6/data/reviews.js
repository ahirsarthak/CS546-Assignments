const mongoCollections = require("../config/mongoCollections");
const restsData = mongoCollections.restaurants;
const moment = require("moment");

let restDS = require("./restaurants"); // we need use async method of restsData

let { ObjectId } = require("mongodb");
var ObjectID = require("mongodb").ObjectId;
const { restaurants } = require("../config/mongoCollections");

function stringCheck(str) {
  // if (str === undefined || str === null) throw "Error: string does not exist";
  if (typeof str !== "string") throw `Error: ${str} is not of type string`;
}

async function getAll(restaurantId) {
  stringCheck(restaurantId);
  if (!restaurantId) throw "You must provide an restaurantId to get";
  if (typeof restaurantId !== "string" || restaurantId.length === 0)
    throw "restaurantId must be string type and not an empty string";
  if (!ObjectID.isValid(restaurantId))
    throw "restaurantId provided is not a valid ObjectId"; //MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
  let parsedrestID = ObjectId(restaurantId);
  const restCollection = await restsData();

  const currRest = await restCollection.findOne({ _id: parsedrestID });
  return currRest.reviews;
}
/*function calculateAverage(array) {
  var total = 0;
  var count = 0;

  array.forEach(function (item, index) {
    total += item;
    count++;
  });

  return total / count;
}

console.log(calculateAverage());*/
async function create(
  restaurantId,
  title,
  reviewer,
  rating,
  dateOfReview,
  review
) {
  /*if (restaurantId === undefined || restaurantId === null)
    throw "Error: string does not exist";*/
  if (!restaurantId) throw "You must provide an id to search for";
  const check1 = ObjectID.isValid(restaurantId);
  if (check1 == false) throw "enter valid id";

  /* stringCheck(restaurantId);
  stringCheck(title);
  stringCheck(reviewer);
  stringCheck(dateOfReview);*/
  if (title == " " || reviewer == " " || dateOfReview == " " || review == " ")
    throw "Strings with empty spaces are NOT valid strings";
  if (
    !restaurantId ||
    !title ||
    !reviewer ||
    !rating ||
    !dateOfReview ||
    !review
  )
    throw "All fields must have valid values";
  if (
    typeof title !== "string" ||
    typeof reviewer !== "string" ||
    typeof dateOfReview !== "string" ||
    typeof review !== "string"
  )
    throw "The title, reviewer, dateOfReview, review must be string type";
  if (typeof rating !== "number") throw "rating must be number type";
  if (rating < 1 || rating > 5) throw "rating must be in the range 1 to 5";
  if (
    title.length === 0 ||
    reviewer.length === 0 ||
    dateOfReview === 0 ||
    review === 0
  )
    throw "The title, reviewer, dateOfReview, review cannot be empty strings";
  if (dateOfReview === undefined || dateOfReview === null)
    throw `Error: date does not exist`;

  /*var inputDate = new Date(dateOfReview);
  var todaysDate = new Date();
  var d = new Date();

  /*if (inputDate.setHours(0, 0, 0, 0) !== todaysDate.setHours(0, 0, 0, 0))
    throw `it worked`;*/

  if (!moment(dateOfReview, "MM/DD/YYYY").isSame(Date.now(), "day")) {
    throw `      "Error: ENTER A VALID DATE TODAYS DATE IN MM/DD/YYYY FORMAT" `;
  }

  if (!moment(dateOfReview, "MM/DD/YYYY", false).isValid())
    throw `Error: date is not in the right format`;

  // stringCheck(review);
  let parsedId = ObjectId(restaurantId);
  const restCollection = await restsData();

  const newReview = {
    _id: ObjectId(),
    title: title,
    reviewer: reviewer,
    rating: rating,
    dateOfReview: dateOfReview,
    review: review,
  };
  /*const reviewss = await this.getAll(restaurantId);
  //console.log("reviews", reviews);

  function Number(restaurant) {
    // console.log("reviews", reviews);
    let count = 1;
    let sum = 0;
    let reviews = restaurant.reviews;
    for (let key of reviewss) {
      //let reviews = restaurant.reviews;
      sum += reviews.rating; //
      // count++;
      console.log("key.rating", key.rating);
    }

    //sum = sum + 1;
    // let avg = sum / reviews.length;
    // console.log("count++", count++);
    // console.log("reviews.length", reviews.length);
    // console.log(sum);
    //  console.log("avg", avg);
    console.log("sum", sum);

    //return avg;
  }
  //console.log(updateRating);
  const updateRating = await restCollection.updateOne(
    { _id: parsedId },
    { $set: { overallRating: Number(rating) } }
  );*/
  const currRest = await restCollection.updateOne(
    { _id: parsedId },
    { $addToSet: { reviews: newReview } }
  );
  Avg(restaurantId);
  /*let restaurant = restDS.get(restaurantId);
  let overallRating = updateRating(restaurant);
  let currRest1 = await restCollection.updateOne(
    { _id: parsedId },
    { $set: overallRating }
  );*/
  return restDS.get(restaurantId);
}
/*function updateRating(restaurant) {
  let count = 0;
  let sum = 0;
  let avg = 0;
  let reviews = restaurant.reviews;
  for (const key in reviews) {
    sum = sum + key.rating;
    count++;
  }
  avg = sum / count;
  return avg;
}*/
async function Avg(restaurantId) {
  let parsedID = ObjectId(restaurantId);
  const RestaurantCollection = await restaurants();
  const restaurant = await RestaurantCollection.findOne({ _id: parsedID });
  if (!restaurant) throw `restaurant not found`;

  let sum = 0;
  for (let i = 0; i < restaurant.reviews.length; i++) {
    let object = restaurant.reviews[i];
    sum += object.rating;
  }
  sum /= restaurant.reviews.length;
  await RestaurantCollection.updateOne(
    { _id: parsedID },
    { $set: { overallRating: sum } }
  );
}

async function get(reviewId) {
  stringCheck(reviewId);
  if (!reviewId) throw "You must provide an reviewId to get";
  if (typeof reviewId !== "string" || reviewId.length === 0)
    throw "the reviewId must be string type and not an empty string";
  if (!ObjectID.isValid(reviewId))
    throw "the reviewId provided is not a valid ObjectId";
  const restCollection = await restsData();

  let retReview = {};
  let targetObject = await restCollection.findOne({
    "reviews._id": ObjectId(reviewId),
  });
  let reviewList = targetObject["reviews"];

  for (let review of reviewList) {
    if (review["_id"].toString() === ObjectId(reviewId).toString())
      retReview = review;
  }
  if (!retReview) throw "Cannot find review with that reviewId";

  return retReview;
}

async function remove(reviewId) {
  stringCheck(reviewId);
  if (!reviewId) throw "You must provide an reviewId for removing";
  if (typeof reviewId !== "string" || reviewId.length === 0)
    throw "The reviewId must be string type and not an empty string";
  if (!ObjectID.isValid(reviewId))
    throw "The reviewId provided is not a valid ObjectId";
  const restCollection = await restsData();
  //const RestaurantCollection = await restaurants();
  // const restaurant = await RestaurantCollection.findOne({ _id: parsedID });

  let targetObject = await restCollection.findOne({
    "reviews._id": ObjectID(reviewId),
  });
  restIds = targetObject._id;

  let deleteRestId = await restCollection.updateOne(
    { _id: restIds },
    { $pull: { reviews: { _id: ObjectID(reviewId) } } }
  );
  Avg();

  return deleteRestId;
}

module.exports = {
  create,
  get,
  remove,
  getAll,
};
