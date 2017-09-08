const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(
  "mongodb://localhost:27017/urlshorts"
);

autoIncrement.initialize(connection);

const URLSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  original_url: {
    type: String,
    required: [true, "NO_URL"],
    validate: validators.isURL({
      message: "NO_URL",
      require_protocol: true,
      protocols: ["http", "https"]
    })
  },
  short_url: {
    type: String
  }
});

URLSchema.plugin(autoIncrement.plugin, {
  model: "Url",
  startAt: 100,
  field: "code"
});

module.exports = mongoose.model("Url", URLSchema);
