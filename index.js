import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
// const port = 3000;

// app.set("views", "views");
// app.set("view engine", "ejs");

// Middleware: Path for static files in public folder
app.use(express.static("public"));

// Middleware: bodyParser to get form values from html
app.use(bodyParser.urlencoded({ extended: true }));

// Root directory request
app.get("/", async (req, res) => {
  try {
    const result = await axios.get(`https://api.coinpaprika.com/v1/coins`);
    const coins = result.data;
    res.render("index", { coins: coins });
  } catch (error) {
    console.log(JSON.stringify("Error: " + error));
    res.status(500).send("Error fetching coins");
  }
});

// Get rate about specific coin
app.post("/coin-rate", async (req, res) => {
  let id = req.body.coinid;
  try {
    const rate = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${id}`
    );
    const info = await axios.get(
      `https://api.coinpaprika.com/v1/coins/${id}`
    );
    res.render("coin-rate", { rate: rate.data , info: info.data});
  } catch (error) {
    console.log(JSON.stringify("Error: " + error));
  }
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// export the app for vercel serverless functions
export default app;