const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  dynamicFields: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
