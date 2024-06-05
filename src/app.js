import express from "express";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { getDAOFromConfig } from "./dao/gateway.js";
import { config } from "./config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(morgan("dev"));

app.use("/products", productRouter);
app.use("/carts", cartsRouter);

getDAOFromConfig().initConnection();

app.listen(config.PORT || 8080, () =>
  console.log(`Server ok on port ${config.PORT}`)
);
