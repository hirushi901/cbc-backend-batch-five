import Product from "../model/product.js";


export async function getProduct(req,res){
 //   Product.find().then(
  //      (data)=>{
  //          res.json(data)
  //      }
 //   )

 try{

    if(isAdmin(req)){
        const products=await Product.find()
    res.json(products)

    }else{
         const products=await Product.find({isAvailable:true})
    res.json(products)


    }
   
 }catch(err){
    res.json({
        message:"failed to get product",
        error:err
    })
 }
}

export function saveProduct(req,res){


if(!isAdmin(req)){
    res.status(403).json({
        message:"youu are not authorized to add the product"
    })

    return
}

   

    const product=new Product(
            req.body
    )

    //save confirm

    product.save().then(()=>{
        res.json(
            {
               message:"Product  saved successfully"
            }
        )
    }).catch(()=>{
        res.json(
            {
                message:"product added failed"
            }
        )
    })
}





 export function putProduct(req,res){
    res.json(
            {
                massage : "this is a put request"
            }
        )
 }

 export function isAdmin(req){
    if(req.user==null){
        return false
    }

    if(req.user.role != "admin"){
        return false
    }

    return true
 }


 export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json(
            {
message:"you are not authorized to delete a product"
            }
        )
        return
    }

try{
    await Product.deleteOne({productId:req.params.productId})

    res.json(
        {
            message:"product deleted successfully"
        }
    )
}catch(err){
    res.status(500).json(
        {
            message:"product delete was failed",
            error:err
        }
    )
}
 }

 export async function  updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message:"you are not authorized to update a product"
        })
        return
    }

    const productId=req.params.productId
    const updatingData=req.body

    try{
       await Product.updateOne(
        {productId:productId},
        updatingData)

        res.json({
            message:"product updated successfully"
        })
        
 }catch(err){
    res.status(500).json({
        message:"internal server error ",
        error:err
    })
 }  


 }  