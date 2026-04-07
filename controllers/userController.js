import User from "../model/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export function createUser(req,res){

    if(req.body.role=="admin"){
        if(req.user!=null){
            res.status(403).json(
                {
                    message:"you are not authorized to create an admin account"
                }
            )
            return
        }else{
            res.status(403).json({
                message:"tou are not authorize to create an admin account.please login first"
            })
            return
        }
    }


const passwordHashed=bcrypt.hashSync(req.body.password ,10)
    const user=new User(
        {
           
           firstname:req.body.firstname,
           lastname:req.body.lastname,
           email :req.body.email, 
           password:passwordHashed,
           role:req.body.role,
           
        }
    )

     user.save().then(()=>{
             res.json(
                 {
                      massage:"Student added successfully"
                 }
             )
             
            
            }).catch(()=>{
             res.json({
                 massage:"student added failed"
             })
             
            })
}


export function loginUser(req ,res){
    const email =req.body.email
    const password=req.body.password

    User.findOne({email:email}).then(
        (user)=>{
            if(user==null){
                res.status(404).json({
                    message:"User not found"
                })

                
            }
            else{
                const isPasswordCorrect=bcrypt.compareSync(password,user.password)
                if(isPasswordCorrect){

                    const token=jwt.sign(
                        {
                            email:user.email,
                            firstname:user.firstname,
                            lastname:user.lastname,
                            role:user.role,
                            img:user.img
                        },
                        "cbc-batch-five#@2025"
                    )
        res.json({
            message : "Login successful",
            token:token
           
        })
    }else{
        res.status(401).json({
            message : "Invalid password"
        })
    }
            }
        }
    )
}
