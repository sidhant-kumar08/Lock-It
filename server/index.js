import express, { urlencoded } from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import manageRoutes from './routes/manage.js'
import cors from 'cors'
import verifyToken from './utils/verifyToken.js'
import cookieParser from "cookie-parser";
import passwordModel from "./models/password-model.js";
import jwt from 'jsonwebtoken'

config();


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongo db connected successfully')
}).catch((err)=>{
    console.log(err)
})



    

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser())




app.use(
  urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors({
  origin: 'https://lockit-one.vercel.app',
  credentials: true,
}))





app.use('/auth', authRoutes)
app.use('/manage', verifyToken, manageRoutes) 










app.listen(PORT, () => {
  console.log(`app is listening on port : ${PORT}`);
});
