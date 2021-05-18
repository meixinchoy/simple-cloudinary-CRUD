const mongoose = require("mongoose");
const pictureSchema = new mongoose.Schema({
  cloudinary_link: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Picture", pictureSchema);
