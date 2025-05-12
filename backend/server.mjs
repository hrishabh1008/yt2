import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose';
import { userRouter } from './routes/user.routes.mjs';



const PORT = 9999;
const app = express(); //creating express instance

app.listen(PORT, () => {
  //starting server at port 5000

  console.log(`***Server Connected => http://localhost:${PORT} ***`);
});

app.use(json());
app.use(urlencoded());
userRouter(app);

mongoose
  .connect("mongodb://localhost:27017/hrb-ytclone")
  .then(() => {
    //connecting to the mongoDb data base
    console.log("Successfully connected to the MongoDB data base"); //consoling success
  })
  .catch((err) => {
    console.log("Something Went Wrong - Data base not connected: ", err); //consoling error if error occurred
  });;