import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connectDb from "./connectdb.js";

import authroutes from "./routes/authroute.js";
import categoryRoutes from "./routes/categoryroute.js";
import productRoutes from "./routes/productroute.js";
import paymentRoutes from "./routes/paymentroute.js";
import chatRoute from  "./routes/chatroute.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const startServer = async () => {

  try {

    await connectDb();

    app.use("/api/v1/auth", authroutes);

    app.use(
      "/api/v1/category",
      categoryRoutes
    );

    app.use(
      "/api/v1/product",
      productRoutes
    );

    app.use(
      "/api/v1/payment",
      paymentRoutes
    );

    app.use(
      "/api/v1/chat",
      chatRoute
    );

    const PORT =
      process.env.PORT || 8080;

    app.listen(PORT, () => {

      console.log(
        `Server running on ${PORT}`
      );

    });

  }
  catch(error){

    console.log(error);

  }

};

startServer();