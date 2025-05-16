require("dotenv").config();
const express = require("express");
const { Readable } = require("stream");

const app = express();
const API_URL = `${process.env.MUSIKCUBE_SERVER_ADDRESS}:${process.env.MUSIKCUBE_STREAMING_PORT}/audio/external_id/`;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/api", (req, res) => {
    func(req, res);
});

async function func(req, res) {
    const authString = btoa("default:" + process.env.MUSIKCUBE_PASSWORD);

    let fetchResponse = await fetch(API_URL + req.query.externalId, {
        headers: {
            Authorization: "Basic " + authString,
            "Access-Control-Allow-Origin": "*",
        },
    });

    Readable.fromWeb(fetchResponse.body).pipe(res);
}

const PORT = process.env.PROXY_PORT || 5000;
app.listen(PORT, () =>
    console.log(`Proxy running and listening on port ${PORT}`),
);
