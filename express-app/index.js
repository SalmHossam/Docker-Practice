const express = require("express");
const mongoose = require("mongoose");

const redis = require("redis");

const PORT = process.env.PORT || 4000;
const app = express();

const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 27017;
const DB_HOST = "mongo";

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const redisClient = redis.createClient({
  url: "redis://redis:6379"
});

redisClient.connect()
  .then(() => console.log("connected to redis..."))
  .catch((err) => console.error("redis connection error:", err));

mongoose
  .connect(URI)
  .then(() => console.log("connected to db..."))
  .catch((err) => console.error("db connection error:", err));


app.get("/", (req, res) => {
  redisClient.set("greeting", "Hello Tresmerge from Redis!");
  res.send("<h1>Hello Tresmerge!</h1>");
});

app.get("/greet", async (req, res) => {
  const greeting = await redisClient.get("greeting");
  res.send(`<h1>${greeting}</h1>`);
});


app.listen(PORT, () => {
  console.log(` app is up and running on port: ${PORT}`);
});
