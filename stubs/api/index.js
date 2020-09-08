const fs = require("fs");
const path = require("path");
const router = require("express").Router();

var scards;

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://89.223.91.151:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const loadJson = (filepath, encoding = "utf8") =>
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `${filepath}.json`), { encoding })
  );

const returnScards = (res) =>
  setTimeout(() => {
    res.send(scards);
  }, 200);

router.get("/scards", (req, res) => {
  if (scards == null) scards = loadJson("./scardsData");
  returnScards(res);
});

router.delete("/scards/:id", function (req, res) {
  scards = scards.filter((scard) => scard.id != req.params.id);
  returnScards(res);
});

module.exports = router;
