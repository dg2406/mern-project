import express from "express";
import stripe from "../config/stripe.js";

const router = express.Router();

router.post("/checkout", async(req,res)=>{

try{

const {cart}=req.body;

const lineItems = cart.map(item=>({

price_data:{

currency:"inr",

product_data:{
name:item.name
},

unit_amount:item.price*100

},

quantity:item.quantity || 1

}));

const session =
await stripe.checkout.sessions.create({

payment_method_types:["card"],

line_items:lineItems,

mode:"payment",

success_url:
"http://localhost:3000/success",

cancel_url:
"http://localhost:3000/cancel"

});
res.json({
    url: session.url
    });
}
catch(error){

console.log(error);

res.status(500).json({
success:false,
message:error.message
});

}

});

export default router;