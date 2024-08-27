import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.set("view engine", "ejs");

// Middleware: Path for static files in public folder
app.use(express.static("public"));

// Middleware: bodyParser to get form values from html
app.use(bodyParser.urlencoded({ extended: true }));

let coins = {};

// Get coins list from api
try {
  const result = await axios.get(`https://api.coinpaprika.com/v1/coins`);
  coins = result.data;
} catch (error) {
  console.log(JSON.stringify("Error: " + error));
}

// Root directory request
app.get("/", async (req, res) => {
  res.render("index.ejs", { coins: coins });
});

// Get rate about specific coin
app.post("/coin-rate", async (req, res) => {
  let id = req.body.coinid;
  try {
    const result = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${id}`
    );
    res.render("coin-rate.ejs", { data: result.data });
  } catch (error) {
    console.log(JSON.stringify("Error: " + error));
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
