import express from "express"

import { getProduct,saveProduct,deleteProduct,putProduct } from "../controllers/productController.js"


const productRouter=express.Router()

productRouter.get("/",getProduct)

productRouter.post("/",saveProduct)

productRouter.delete("/:productId",deleteProduct)

productRouter.put("/",putProduct)

export default productRouter