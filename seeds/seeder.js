const Campgrounds = require('../model/Campgrounds');
const dbConnect = require('../config/dbConnect');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const randomData = (array) => array[Math.floor(Math.random() * array.length)];

const dbSeed = async () => {
  dbConnect();

  await Campgrounds.deleteMany({});

  for (let i = 1; i <= 50; i++) {
    const randomPrice = Math.floor(Math.random() * 20) + 10;
    const newCamp = await new Campgrounds({
      title: `${randomData(descriptors)} ${randomData(places)}`,
      location: `${cities[i - 1].city}, ${cities[i - 1].state}`,
      image: `https://source.unsplash.com/collection/3133499/640x426`,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias fugiat officia eligendi, saepe nulla repellendus dolores a cumque itaque harum qui officiis quibusdam veniam praesentium! Distinctio qui cum et incidunt?`,
      price: randomPrice,
    });
    try {
      await newCamp.save();
    } catch (error) {
      console.error(error.message);
    }
    if (i === 50) {
      console.log(`${i} data have been seeded...\nProcess terminated`);
      process.exit();
    }
  }
};

dbSeed();
