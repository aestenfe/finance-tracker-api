const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const { origin, limiter } = require("../config")
const accounts = require("./routes/AccountRoutes");

const { request } = require("express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(limiter);

app.use(compression());
app.use(helmet());

app.get('/', (request, response) => {
  response.json({ info: 'Finance Tracker API' })
})

app.get("/accounts", accounts.getAccounts);
app.get("/accounts/:id", accounts.getAccount);
app.post("/accounts", accounts.addAccount);
app.put("/accounts/:id", accounts.updateAccount);
app.delete("/accounts/:id", accounts.deleteAccount);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started!");
});
