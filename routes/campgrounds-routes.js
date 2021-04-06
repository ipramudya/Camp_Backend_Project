const express = require('express');
const router = express.Router();
const {
  getCampgrounds,
  postCampground,
  getCampgroundById,
  putCampground,
  deleteCampground,
  getNewCampgroundForm,
  getEditCampgroundForm,
} = require('../controller/campgrounds-controller');

// route: /campgrounds/
router.route('/').get(getCampgrounds).post(postCampground);

// route: /campgrounds/:id
router
  .route('/:id')
  .get(getCampgroundById)
  .put(putCampground)
  .delete(deleteCampground);

// route: /campgrounds/new
router.route('/new').get(getNewCampgroundForm);

// route: /campgrounds/:id/edit
router.route('/:id/edit').get(getEditCampgroundForm);

module.exports = router;
