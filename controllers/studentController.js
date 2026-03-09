 import Student from "../model/student.js";

 export function getStudent(req,res){
    Student.find().then(
        (data)=>{
            res.json(data)
        }
    )
 }


 export function saveStudent(req,res){
    console.log(req.body)
     
            //create student schema
     
            const student= new Student({
             
         "name":req.body.name,
         "age" : req.body.age,
         "stream":req.body.stream,
         "email":req.body.email 
     }
     
            )
            student.save().then(()=>{
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


 export function deleteStudent(req,res){
    res.json(
            {
                massage : "this is a delete request"
            }
        )
        

 }

 export function putStudent(req,res){
    res.json(
            {
                massage : "this is a put request"
            }
        )
 }