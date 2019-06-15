const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

app.use(bodyParser.json());

// Uncomment for local testing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const formUrl =
  "https://docs.google.com/a/reidrepairs.com/forms/d/1qdhCt3fDuoNEPx3uhPz4wSh8TL3mUCzcgcm6BQWjRTg/formResponse";

app.post("/form/", function(req, res) {
  console.log("form post received on node.");
  const testValueCheck = req.body.find(item => item.name === "testAnswer")
    .value;
  if (testValueCheck !== "2" || testValueCheck !== "two") {
    res.send("Ok");
    return;
  }
  console.log("value check is ok.");
  const googleString = req.body.reduce((str, item, idx) => {
    const char = idx === 0 ? "?" : "&";
    return (str +=
      item.name === "testAnswer" ? "" : `${char}${item.name}=${item.value}`);
  }, "");

  const requestUrl = `${formUrl}${googleString}`;
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
