require("dotenv").config();
const express = require("express");
const { Readable } = require("stream");

const app = express();
const serverAddress = process.env.MUSIKCUBE_SERVER_ADDRESS;
const streamingPort = process.env.MUSIKCUBE_STREAMING_PORT || 7906;
const port = process.env.PROXY_PORT || 5000;

if (serverAddress == undefined || serverAddress == "") {
  console.error(
    "Server Adress is not defined. Please check your .env file for the MUSIKCUBE_SERVER_ADDRESS entry",
  );
  return;
}

const API_URL = `${serverAddress}:${streamingPort}/audio/external_id/`;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api", (req, res) => {
  func(req, res);
});

async function func(req, res) {
  const authString = btoa("default:" + process.env.MUSIKCUBE_PASSWORD);
  const fetchUrl = API_URL + req.query.externalId;
  console.log(`Fetching: ${fetchUrl}`);

  let fetchResponse = await fetch(fetchUrl, {
    headers: {
      Authorization: "Basic " + authString,
      "Access-Control-Allow-Origin": "*",
    },
  });

  Readable.fromWeb(fetchResponse.body).pipe(res);
}

console.log(`Musikcube Server Adress: ${serverAddress}`);
console.log(`Musikcube Streaming Port: ${streamingPort}`);
console.log(`Proxy Port: ${port}`);

app.listen(port, () => console.log(`Proxy running... `));
