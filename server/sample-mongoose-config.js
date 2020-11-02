const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');


const mongooseFunction = () => {
  mongoose.connect('mongodb://<user_name>:<password>@<cluster><url>/<db_name>');
  mongoose.connection.once('open', () => {
    console.log("connected to database");
  });
}

module.exports = { mongooseFunction };
