import express from "express";
import session from "express-session";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import userRouter from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js";
import { getDAOFromConfig } from "./dao/gateway.js";
import handlebars from "express-handlebars";
import { config } from "./config.js";
import { __dirname } from "./utils.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./passport/local-strategy.js";
import "./passport/github-strategy.js";

const app = express();
const conf = await config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session(conf.storeConfig));
//app.use(morgan("dev"));

/* ------------------------------------ - ----------------------------------- */
//! ANTES DE LAS RUTAS
app.use(passport.initialize());
app.use(passport.session());
/* ------------------------------------ - ----------------------------------- */

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.use("/api/users", userRouter);
app.use("/", viewsRouter);

app.listen(process.env.PORT || 8080, () => {
  const conn = getDAOFromConfig();
  conn.initConnection();
  console.log(`Server ok on port ${process.env.PORT}`);
});
