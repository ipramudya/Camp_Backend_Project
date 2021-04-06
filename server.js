// Core Module and 3rd Party Module
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
require('dotenv').config({ path: './config/config.env' });

// Custom Module
const dbConnect = require('./config/dbConnect');
const Campground = require('./model/Campgrounds');
const asyncHandler = require('./utils/asyncHandler');
const ErrorResponse = require('./utils/ErrorResponse');
const validateCampground = require('./middleware/validateSchema');

const app = express();
dbConnect();

// Ejs-engine for boilerplating
app.engine('ejs', ejsMate);

// Setting up template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

// Route :  GET -> /campgronds
// Desc :   GET ALL CAMPGROUNDS
app.get(
  '/campgrounds',
  asyncHandler(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/show-all', { campgrounds });
  })
);

// Route :  GET -> /campgronds/new
// Desc :   RENDERING ADD NEW CAMPGROUND's FORM
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/newCamp');
});

// Route :  GET -> /campgronds/:id
// Desc :   GET CAMPGROUND WITH AN ID
app.get(
  '/campgrounds/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const campgrounds = await Campground.findById(id);
    res.render('campgrounds/show-id', { campgrounds });
  })
);

// Route :  GET -> /campgronds/:id/edit
// Desc :   RENDERING EIDT CAMPGROUND's FORM
app.get(
  '/campgrounds/:id/edit',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const campgrounds = await Campground.findById(id);
    res.render('campgrounds/edit', { campgrounds });
  })
);

// Route :  POST -> /campgronds
// Desc :   ADD NEW CAMPGROUNDS, AFTER SUBMITTING FORM
app.post(
  '/campgrounds',
  validateCampground,
  asyncHandler(async (req, res, next) => {
    const { campground } = req.body;
    const newCampground = new Campground(campground);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground['_id']}`);
  })
);

// Route :  PUT -> /campgronds/:id
// Desc :   EDIT NEW CAMPGROUNDS, AFTER SUBMITTING FORM
app.put(
  '/campgrounds/:id',
  validateCampground,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { campground } = req.body;
    const updatedCampground = await Campground.findByIdAndUpdate(id, {
      ...campground,
    });
    res.redirect(`/campgrounds/${updatedCampground['_id']}`);
  })
);

// Route :  DELETE -> /campgronds/:id
// Desc :   DELETE CAMPGROUNDS
app.delete(
  '/campgrounds/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
  })
);

// Desc :   HANDLING ERROR ROUTE
app.all('*', (req, res, next) => {
  next(new ErrorResponse('Page not found !', 404));
});

// Desc :   DEFAULT ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'OH NO, Something Went Wrong !';
  res.status(statusCode).render('error', { err });
});

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`server is running on port ${PORT}, http://localhost:${PORT}`);
});
