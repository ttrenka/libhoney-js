/* eslint-env node */
const express = require("express");
const libhoney = require("libhoney");
const responseTime = require("response-time");
let app = express();

let honey = new libhoney({
  writeKey: process.env["HONEY_WRITE_KEY"],
  dataset: "express-example-response-time",
});

app.use(
  responseTime((req, res, time) => {
    honey.sendNow({
      app: req.app,
      baseUrl: req.baseUrl,
      fresh: req.fresh,
      hostname: req.hostname,
      ip: req.ip,
      method: req.method,
      originalUrl: req.originalUrl,
      params: req.params,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      route: req.route,
      secure: req.secure,
      xhr: req.xhr,
      responseTimeMs: time,
    });
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
