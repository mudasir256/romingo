const express = require("express");
const path = require("path");
const fs = require("fs");
const seo = require("./seo"); // note here
const app = new express();
app.use("/static", express.static(path.join(__dirname, "build/static")));
app.get("*", (req, res) => {
  let pathname = req.pathname || req.originalUrl;
  let page = seo.find((item) => item.path === pathname);
  if (page) {
    let html = fs.readFileSync(path.join(__dirname, "build", "index.html"));
    let htmlWithSeo = html
      .toString()
      .replace("__META_TITLE__", page.title)
      .replace("__META_DESCRIPTION__", page.description)
      .replace("__META_IMAGE__", page.image);
    return res.send(htmlWithSeo);
  }
  return res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(3000, () => {
  console.log("listened on 3000");
});