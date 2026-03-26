import Order from "../model/order.js"

export async function createOrder(req,res){
    if(req.user==null){
        res.status(403).json({
            message:"please login and try again"
        })
        return
    }

    const orderInfo=req.body

    if(orderInfo.name==null){ 
        orderInfo.name=req.user.firstname+" "+req.user.lastname
    }
   
    let orderId ="CBC00001"

    const lastOrder = await Order.findOne().sort({date:-1})

    // ✅ FIXED HERE
    if (lastOrder != null) {
        const lastOrderId = lastOrder.orderId      
        const lastOrderNumberString = lastOrderId.replace("CBC","")

        const lastOrderNumber = parseInt(lastOrderNumberString)
        const newOrderNumber = lastOrderNumber + 1

        const newOrderNumberString = String(newOrderNumber).padStart(5,"0") 
        orderId = "CBC" + newOrderNumberString 
    }

    

    try{

let total=0;
let labeltotal=0;
const products=[]

for(let i=0;i<orderInfo.products.length;i++){
    const item=await Product.findOne({productId:orderInfo.products[i].productId})

    if(item==null){
        res.status(404).json({
            message:"product with productId "+orderInfo.products[i].productId+" not found"
        })
        return
}

if(item.isAvailable==false){
    res.status(404).json({
        message:"product with productId "+orderInfo.products[i].productId+" is not available"
    }) 

    return

}


  products[i]={
    productInfo:{
        productId:item.productId,
        name:item.name,
        altName:item.altName,
        description:item.description,
        images:item.images,
        labelPrice:item.labelPrice,
        Price:item.Price


    },
    quantity:orderInfo.products[i].quantity
  }
total=total+(item.Price*orderInfo.products[i].quantity)
labeltotal=labeltotal+(item.labelPrice*orderInfo.products[i].quantity)

}


const order = new Order({
        orderId:orderId,
        email:req.user.email,
        name:orderInfo.name,
        address:orderInfo.address,
        phone:orderInfo.phone,
        total:0,
        products:products,
        labeltotal:labeltotal,
        total:total,

    }) 

        const createdOrder = await order.save() 
        res.json({
            message:"order created successfully",
            order:createdOrder
        })
    }catch(err){
        res.status(500).json({
            message:"failed to create order",
        })
    }
}