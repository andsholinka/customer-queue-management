require('dotenv').config();

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.customer = require("./customer.model.js")(mongoose);
db.queue = require("./queue.model.js")(mongoose);

module.exports = db;