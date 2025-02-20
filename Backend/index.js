import cookieParser from 'cookie-parser'
import express from 'express'

const app = express()

const PORT = 8000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions = {
  origin:["http://localhost:5121"],
  credentials: true
}


app.listen(PORT,()=>{
  console.log("Server running 8000 port ")
})