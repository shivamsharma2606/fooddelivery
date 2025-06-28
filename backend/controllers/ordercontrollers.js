import orderModel from "../models/orderModel.js";
import userModel from "../models/usermodel.js";
import Stripe from "stripe";

 const stripe = new Stripe(process.env.STRIPE_SECRET_kEY);

const placeOrder = async (req, res) => {
  const fronted_url = "http://localhost:5174";

  try {
    const { userId, items, amount, address } = req.body;

     if (amount < 50) {
      return res.json({
        success: false,
        message: "कम से कम ऑर्डर राशि ₹50 होनी चाहिए।",
      });
    }

     const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

     await userModel.findByIdAndUpdate(userId, { cartData: {} });

     const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,  
      },
      quantity: item.quantity,
    }));

 
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 30 * 100, 
      },
      quantity: 1,
    }); 

     const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${fronted_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${fronted_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Place order error:", error.message);
    res.json({ success: false, message: "ऑर्डर प्लेस करने में सर्वर एरर आया।" });
  }
};


const verifyOrder = async (req,res)=>{
    const {orderId,success}=req.body;
    try {
      if (success=="true") {
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
      }
      else{
        await orderModel.findByIdAndDelete(orderId)
        res.json({success:false,message:" Not paid"})
      }
    } catch (error) {
      console.log("error")
      res.json({success:false,message:"error"})

    }
}

//user orders for fronted
 
const userOrders = async (req,res)=>{
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({success:true,data:orders})
  } catch (error) {
    console.log("error")
    res.json({success:false,message:error})

  }

}

//listin orders from admin panel

const listorders = async(req,res)=>{
    try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})
      
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"error"})

    }
}
//api for updating order ststus

const updatestatus= async (req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
    
  }
}

export { placeOrder,verifyOrder,userOrders,listorders,updatestatus };
 