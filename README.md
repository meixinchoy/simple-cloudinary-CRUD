## Storing Images using Nodejs, Multer, Cloudinary and MongoDB

This is a simple Nodejs app that demonstrates the use of Multer, Cloudinary and MongoDB such that one is able to store their images in the cloud. 

### run this app

- Create an account at Cloudinary
- Create an account at MongoDB Atlas and create a database
- Clone this repo and run **npm install**
- Create **.env** file at root level of the cloned repo and add following environment variables:
    CLOUDINARY_CLOUD_NAME= (get from cloudinary's dashboard)
    CLOUDINARY_API_KEY= (get from cloudinary's dashboard)
    CLOUDINARY_API_SECRET= (get from cloudinary's dashboard)
    MONGO_URI= (get from mongoDB Atlas)
- Type **npm start** to start the server on local port 3000

Cloudinary can also perform image transformations and Manipulations. For more, feel free to check out their documentation: https://cloudinary.com/documentation

