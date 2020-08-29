const fs = require("fs");
const path = require("path");
const router = require("express").Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://89.223.91.151:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const loadJson = (filepath, encoding = "utf8") =>
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `${filepath}.json`), { encoding })
  );

router.get("/getMainData", (req, res) => {
  setTimeout(() => {
    res.send(
      loadJson('./getMainData')
    );
  }, 1000)
});

module.exports = router;