import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
dotenv.config();

app.get("/",(req,res)=>{
  return res.status(200).json({scuess:"ture",message:"main pages "})
})

const corsOptions = {
  origin:["http://localhost:5121"],
  credentials: true
}
app.use(cors(corsOptions))


const PORT =process.env.PORT|| 8001;
app.listen(PORT,()=>{
  connectDB();
  console.log("Server running 8000 port ")
})