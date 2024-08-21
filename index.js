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

// Root directory request
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/bitcoin", async (req, res) => {
  try {
    const result = await axios.get('https://api.coinpaprika.com/v1/tickers/btc-bitcoin');
    res.render("home.ejs", { price: result.data.quotes.USD.price});
    console.log(JSON.stringify(result.data));
  } catch (error) {
    console.log(JSON.stringify(error.response.data));
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});