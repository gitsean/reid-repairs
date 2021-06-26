const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

app.use(bodyParser.json());

// Uncomment for local testing
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const formUrl =
  "https://docs.google.com/a/reidrepairs.com/forms/d/1qdhCt3fDuoNEPx3uhPz4wSh8TL3mUCzcgcm6BQWjRTg/formResponse";

app.post("/form/", function (req, res) {
  console.log("form post received on node.");
  let params = req.body;
  console.log(params);
  const testValueCheck = params["testAnswer"];
  if (testValueCheck != 2 && testValueCheck !== "two") {
    res.send("Ok");
    return;
  }
  console.log("value check is ok.");
  // convert objec to a query string

  const qs = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const requestUrl = `${formUrl}?${qs}`;
  console.log(requestUrl);
  request.post(requestUrl, null, (error, r, body) => {
    console.log("sending to google form.");
    if (error) {
      console.log("ERROR from google form post... ", error);
      res.send(error);
      return;
    }
    res.send(r);
  });
});

app.listen(3000);
