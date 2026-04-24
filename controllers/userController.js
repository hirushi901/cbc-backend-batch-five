import User from "../model/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function normalizeEmail(email) {
    return typeof email === "string" ? email.trim().toLowerCase() : "";
}

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


    const email = req.body.email?.trim().toLowerCase()
    const password = req.body.password

    if(!email || !password || !req.body.firstname || !req.body.lastname){
        res.status(400).json({
            message:"firstname, lastname, email, and password are required"
        })
        return
    }

const passwordHashed=bcrypt.hashSync(password ,10)
    const user=new User(
        {
           
           firstname:req.body.firstname,
           lastname:req.body.lastname,
           email :email, 
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


export async function loginUser(req, res) {
    const body = req.body || {};
    const email = normalizeEmail(body.email);
    const password = body.password;

    console.log("[login] incoming request", {
        contentType: req.headers["content-type"],
        bodyKeys: Object.keys(body),
        hasEmail: Boolean(body.email),
        hasPassword: Boolean(body.password),
        normalizedEmail: email || "(empty)",
    });

    if (!email || !password) {
        console.warn("[login] missing email or password");
        res.status(400).json({
            message: "email and password are required"
        })
        return
    }

    try {
        console.log("[login] querying user by email");
        const user = await User.findOne({ email });

        if (user == null) {
            console.warn("[login] no user found for email", email);
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            console.warn("[login] password mismatch for email", email);
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                img: user.img
            },
            process.env.JWT_KEY
        );

        console.log("[login] login successful", {
            userId: user._id,
            email: user.email,
            role: user.role,
        });

        res.json({
            message: "Login successful",
            token: token
        })
    } catch (error) {
        console.error("[login] unexpected failure:", error)
        res.status(500).json({
            message: "Login failed. Please try again."
        })
    }
}
