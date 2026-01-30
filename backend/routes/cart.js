const express =require("express")
const router=express.Router()
const Cart = require("../Models/Cart.js")
const Product = require("../Models/Product.js") 

const isAuthenticated=(req,res,next)=>{
    const userId= req.query.userId 
    console.log(userId)
    if(!userId){
        return res.status(401).json({"message":"Unauthorized. Login first "})
    }
    req.userId=userId
    next()
}

router.get("/",isAuthenticated,async(req,res)=>{
  try{
    const cart= await Cart.findOne({user:req.userId}).populate("items.product")
    if (!cart){
        return res.status(200).json({items:[]})
    }
    return res.status(200).json(cart)
  } catch(err){
    console.log("error while adding products to cart",err)
    return res.status(500).json({"message":"Internal server error"})
  } 
})

router.post("/add",isAuthenticated,async (req,res)=>{
  const {productId,quantity}=req.body
  console.log(productId)
  try{
    let cart=await Cart.findOne({user:req.userId})
    console.log(productId,cart)
    if(!cart){
      cart = new Cart({user:req.userId,items:[]})
    }
    const existingItem= cart.items.find((item)=>item.product.toString()==productId) 
    if(existingItem){
      existingItem.quantity+=quantity
      await cart.save()
      return res.status(200).json({"message":"cart updated successfully"})

    }
    else{
      const product = await Product.findById(productId)
      if(!product){
        return res.status(404).json({"message":"Product not found or out of stock"})
      }
      cart.items.push({product:productId, quantity})
      await cart.save()
      return res.status(200).json({"message":"added successfully"})
    }
  }
  catch(err){
    console.log("error while adding to cart",err)
    return res.status(500).json({"message":"internal server error while adding to cart"})
  }
})



// ADD TO CART
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req.query;

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId,
        productId,
        quantity,
      });
      await cartItem.save();
    }

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// GET CART ITEMS
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const cartItems = await Cart.find({ userId }).populate("productId");

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items" });
  }
});




module.exports=router