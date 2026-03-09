 import express from "express"
 
import { deleteStudent, getStudent, putStudent, saveStudent } from "../controllers/studentController.js"

 const studentRouter=express.Router()

 studentRouter.get("/",getStudent )


 studentRouter.post("/",saveStudent)


 studentRouter.delete("/",deleteStudent)


studentRouter.put("/",putStudent)

 export default studentRouter