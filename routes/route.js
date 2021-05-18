const router = require("express").Router();
const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");
const Picture = require("../model/img");
const path = require("path");

//html file
router.get("/", (req, res) => {
  res.sendfile(path.join('views','index.html'), { req });
})

// a maximum of five images is acceptable
router.post("/upload", upload.array("image", 5), async (req, res) => {
  try {
    let pictureFiles = req.files;
    //Check if files exist
    if (!pictureFiles)
      return res.status(400).json({ message: "No picture attached!" });
    //map through images and create a promise array using cloudinary upload function
    let multiplePicturePromise = pictureFiles.map((picture) =>
      cloudinary.uploader.upload(picture.path,{folder:"foldername/"})
    );
    // await all the cloudinary upload functions in promise.all
    let imageResponses = await Promise.all(multiplePicturePromise);

    imageResponses.map(
      (pic) => {
        let img = new Picture({
          name: req.body.name,
          avatar: pic.secure_url,
          cloudinary_id: pic.public_id,
        });
        img.save();
        console.log(img);
      }
    )

    res.status(200).json({ images: imageResponses });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//to get images
router.get("/getimages", async (req, res) => {
  try {
    let img = await Picture.find();
    res.json(img);
  } catch (err) {
    console.log(err);
  }
});

//to delete images by _id
router.get("/delete/:id", async (req, res) => {
  try {
    // Find img by id
    let img = await Picture.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(img.cloudinary_id);
    // Delete img from db
    await img.remove();
    res.json(img);
  } catch (err) {
    console.log(err);
  }
});

// UPDATE- can be achieved by deleting and creating
router.post("/update/:id", upload.single("image"), async (req, res) => {
  try {
    let img = await Picture.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(img.cloudinary_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      name: req.body.name || img.name,
      avatar: result.secure_url || img.avatar,
      cloudinary_id: result.public_id || img.cloudinary_id,
    };
    img = await Picture.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(img);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
