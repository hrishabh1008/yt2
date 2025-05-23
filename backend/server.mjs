import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose';
import { userRouter } from "./routes/users.routes.mjs";
import { configDotenv } from "dotenv";
import channelsRouter from "./routes/channels.routes.mjs";
import videosRouter from "./routes/videos.routes.mjs";
import commentsRouter from "./routes/comments.routes.mjs";
import cors from "cors";

const app = express(); //creating express instance

// Enable CORS for all origins and methods
app.use(cors({ origin: "http://localhost:5173" }));

const config = configDotenv();
const atlasURI = config.parsed.MONGODB_ATLAS_URI;
const PORT = config.parsed.PORT || 9999; // Default to 9999 if not set
// console.log(atlasURI, PORT);
//console .env

const localDataBaseUri = "mongodb://localhost:27017/hrb-ytclone";
//

app.listen(PORT, () => {
  //starting server at port 9999
  console.log(`*** Server Connected => http://localhost:${PORT} ***`);
});

app.use(json());
app.use(urlencoded());

//Application routers
userRouter(app);
channelsRouter(app);
videosRouter(app);
commentsRouter(app);

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
      mongoose
        .connect(localDataBaseUri)
        .then(() => {
          //connecting to the mongoDb data base
          console.log("Successfully connected to the MongoDB data base"); //consoling success
        })
        .catch((err) => {
          console.log("Something Went Wrong - Data base not connected: ", err); //consoling error if error occurred
        });
    });
} else {
  mongoose
    .connect(localDataBaseUri)
    .then(() => {
      //connecting to the mongoDb data base
      console.log("Successfully connected to the MongoDB *local data base*"); //consoling success
    })
    .catch((err) => {
      console.log("Something Went Wrong - Data base not connected: ", err); //consoling error if error occurred
    });
}

