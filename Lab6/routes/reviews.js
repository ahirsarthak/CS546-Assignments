const express = require("express");
const router = express.Router();
const data = require("../data");
const moment = require("moment");

const restData = data.restaurants;
const reviewData = data.reviews;
let ObjectID = require("mongodb").ObjectID;
let { ObjectId } = require("mongodb");
router.get("/:id", async (req, res) => {
  try {
    const reviewRest = await reviewData.getAll(req.params.id);
    res.status(200).json(reviewRest);
  } catch (e) {
    // console.log(e);
    res.status(404).json({ message: "Reviews with restId not found" });
    return;
  }
});

router.post("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "You must supply an id" });
    return;
  }
  const dataReview = req.body;

  if (
    typeof dataReview.title !== "string" ||
    typeof dataReview.reviewer !== "string" ||
    typeof dataReview.dateOfReview !== "string" ||
    typeof dataReview.review !== "string"
  ) {
    res.status(400).json({
      error: "The title, reviewer, dateOfReview, review must be string type",
    });
    return;
  }

  if (!dataReview.reviewer || typeof dataReview.reviewer != "string") {
    res.status(400).json({ error: "You must provide reviewer in string type" });
    return;
  }
  if (
    !dataReview.rating ||
    typeof dataReview.rating != "number" ||
    dataReview.rating < 0 ||
    dataReview.rating > 5
  ) {
    res.status(400).json({ error: "rating should be a range from 1 to 5" });
    return;
  }
  if (!dataReview.dateOfReview || typeof dataReview.dateOfReview != "string") {
    res
      .status(400)
      .json({ error: "You must provide dateOfReview in string type" });
    return;
  }

  if (!moment(dataReview.dateOfReview, "MM/DD/YYYY", false).isValid()) {
    res.status(400).json({
      error:
        "Error: date is not in the right formaYou must provide review in string type",
    });
    return;
  }
  if (
    !moment(dataReview.dateOfReview, "MM/DD/YYYY").isSame(Date.now(), "day")
  ) {
    res.status(400).json({
      error: "Error: ENTER A VALID DATE TODAYS DATE IN MM/DD/YYYY FORMAT",
    });
    return;
  }
  try {
    const { title, reviewer, rating, dateOfReview, review } = dataReview;
    const restReview = await reviewData.create(
      req.params.id,
      title,
      reviewer,
      rating,
      dateOfReview,
      review
    );
    res.status(200).json(restReview);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/review/:id", async (req, res) => {
  // :id is reviewId
  try {
    const aReview = await reviewData.get(req.params.id);
    res.json(aReview);
  } catch (e) {
    // console.log(e);
    res.status(404).json({ error: "Review not found" });
  }
});

router.delete("/:id", async (req, res) => {
  // :id is reviewId
  if (!req.params.id) throw "You must specify an reviewId to delete";
  try {
    const aReview = await reviewData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  try {
    const deleteReview = await reviewData.remove(req.params.id);
    // prettier-ignore

    res.status(200).json({ "reviewId": req.params.id, "deleted": true });
  } catch (e) {
    // console.log(e);
    res.status(500).json({ error: e });
  }
});

module.exports = router;
