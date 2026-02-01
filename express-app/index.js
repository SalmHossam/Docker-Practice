
const { Client } = require("pg");
const express = require("express");
const mongoose = require("mongoose");
const { createClient } = require("redis");


const PORT = process.env.PORT || 4000;
const app = express();

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';
const DB_NAME = 'postgres';

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const redisClient = createClient({
  url: "redis://redis:6379"
});

redisClient.connect()
  .then(() => console.log("connected to redis..."))
  .catch((err) => console.error("redis connection error:", err));

// mongoose
//   .connect(URI)
//   .then(() => console.log("connected to db..."))
//   .catch((err) => console.error("db connection error:", err));

const client = new Client({
   connectionString,
});
client.connect()
  .then(() => console.log("connected to postgres..."))
  .catch((err) => console.error("postgres connection error:", err));

 

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
