// Requiring models
const Campground = require('../model/Campgrounds');

// GET -> /campgrounds/
module.exports.getCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/show-all', { campgrounds });
};

// GET -> /campgrounds/new
module.exports.getNewCampgroundForm = (req, res) => {
  res.render('campgrounds/newCamp');
};

// GET -> /camppgrounds/:id
module.exports.getCampgroundById = async (req, res) => {
  const { id } = req.params;
  const campgrounds = await Campground.findById(id);
  res.render('campgrounds/show-id', { campgrounds });
};

// GET -> /campgrounds/:id/edit
module.exports.getEditCampgroundForm = async (req, res) => {
  const { id } = req.params;
  const campgrounds = await Campground.findById(id);
  res.render('campgrounds/edit', { campgrounds });
};

// POST -> /campgrounds
module.exports.postCampground = async (req, res) => {
  const { campground } = req.body;
  const newCampground = new Campground(campground);
  await newCampground.save();
  res.redirect(`/campgrounds/${newCampground['_id']}`);
};

// PUT -> /campgrounds/:id
module.exports.putCampground = async (req, res) => {
  const { id } = req.params;
  const { campground } = req.body;
  const updatedCampground = await Campground.findByIdAndUpdate(id, {
    ...campground,
  });
  res.redirect(`/campgrounds/${updatedCampground['_id']}`);
};

// DELETE -> /campgrounds/:id
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
};
