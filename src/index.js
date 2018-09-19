import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config/config";

import DocsShopRoutes from "./routes/DocsShopRoutes";

mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoURI,
  { useMongoClient: true },
  err => {
    if (err) console.error(err);
    else console.log("MongoDB connected!");
  }
);

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// routes
// drugstores
app.use("/api/shops", DocsShopRoutes);

// test route
app.get("/test", (req, res) => {
  res.status(200).send({ result: "GET: /test" });
});

app.listen(config.port, () =>
  console.log(`Server running (port: ${config.port})`)
);
