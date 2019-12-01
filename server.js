const expess = require("express");
const app = expess();
const path = require("path");

app.use(expess.static(__dirname + "/dist"));

app.listen(process.env.PORT || 8080);

//PathLocationStrategy

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
