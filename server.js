const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const compression = require("compression");
const path = require("path");
const app = express(),
  port = 8080,
  // Serve the build files
  buildPath = [__dirname, "build"];

app.use(compression());

app.use(
  "/",
  expressStaticGzip(path.join(...buildPath), {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
  })
);

// Fallback to index.html when something that doesn't exist is requested
app.get("/*", (req, res) => {
  res.sendFile(path.join(...buildPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error("Fatal error during server start: ");
    console.error(err.stack || err);
  }
  console.log(`🚀 Server is started successfully listening at port ${port}.`);
});
