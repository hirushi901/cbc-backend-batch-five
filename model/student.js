import mongoose from "mongoose";

//create student schema

       const studentSchema =mongoose.Schema(
        {
            
    "name":String,
    "age" : Number,
    "stream":String,
    "email":String
}
        
       )

       const Student=mongoose.model("Students",studentSchema)

     //export the student
     export default Student; 

    