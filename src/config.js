import "dotenv";
import MongoStore from "connect-mongo";
import { MONGO_URL } from "./dao/mongodb/connection.js";

export const config = async () => ({
  PORT: 8000,
  dao: "mongo",
  storeConfig: {
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      crypto: { secret: process.env.SECRET_KEY },
      ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 },
  },
});
