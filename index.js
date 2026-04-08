import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt, { decode } from 'jsonwebtoken';
import orderRouter from "./routes/orderRouter.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

//mongodb
//mongodb+srv://admin:123@cluster0.gfudtbq.mongodb.net/?appName=Cluster0

const app=express();
app.use(cors())
app.use(bodyParser.json( ))
app.use(express.urlencoded({ extended: true }))


app.use(
    (req,res,next)=>{
        const tokenString=req.header("Authorization")
      
        if(tokenString!=null){
            const token=tokenString.replace("Bearer ","")
             

             jwt.verify(token,process.env.JWT_KEY,
                (err,decoded)=>{
                    if(decoded!=null){
                       req.user=decoded
                       next()

                    }else{
                        console.log("Invalid token")
                        res.status(403).json(
                            {
                                message:"Invalid Token"
                            }
                        )
                    }
                }
             ) 
        }else{
            next()
        }
       
       
    }
)





mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Connected to the database")
}).catch(()=>{
    console.log("Database connection failed")
})



app.use("/product",productRouter)
app.use("/user",userRouter)
app.use("/order",orderRouter)



app.listen(3000,
    ()=>{
        console.log('Server is running on port 3000')
    }
)
