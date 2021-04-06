const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected...`);
  } catch (error) {
    console.log('Connection Error');
    console.error(error.message);
  }
};

module.exports = dbConnect;
