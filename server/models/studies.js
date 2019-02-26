const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studySchema = new Schema({
  name: String,
  schoolId: String
});

module.exports = mongoose.model("Study", studySchema);
