import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose';
import { userRouter } from "./routes/users.routes.mjs";
import { configDotenv } from "dotenv";




const config = configDotenv();
const atlasURI = config.parsed.MONGODB_ATLAS_URI;
const PORT = config.parsed.PORT;
console.log(atlasURI, PORT);
//console .env

const localDataBaseUri = "mongodb://localhost:27017/hrb-ytclone";
//
const app = express(); //creating express instance

app.listen(PORT || 5000, () => {
  //starting server at port 5000

  console.log(`***Server Connected => http://localhost:${PORT} ***`);
});

app.use(json());
app.use(urlencoded());
userRouter(app);

if (atlasURI) {
  mongoose
    .connect(atlasURI)
    .then(() => {
      console.log(
        "successfully connected to the (cloud) MongoDB Atlas Database"
      );
    })
    .catch((err) => {
      console.log(
        "Something went Wrong- Connection to cloud data base failed ",
        err,
        "Trying to connect to local Database"
      );
    });
} else {
  mongoose
    .connect(localDataBaseUri)
    .then(() => {
      //connecting to the mongoDb data base
      console.log("Successfully connected to the MongoDB data base"); //consoling success
    })
    .catch((err) => {
      console.log("Something Went Wrong - Data base not connected: ", err); //consoling error if error occurred
    });
}

