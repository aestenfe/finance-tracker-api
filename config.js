require("dotenv").config();
const rateLimit = require("express-rate-limit");

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

const origin = { origin: isProduction ? "https://www.example.com" : "*" }

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

module.exports = { pool, origin, limiter };
