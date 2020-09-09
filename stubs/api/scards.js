const router = require("express").Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const SCARDS_URL = "/scards";
let idCounter = 10;

var scards;

const loadJson = (filepath, encoding = "utf8") =>
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `${filepath}.json`), { encoding })
  );

scards = loadJson("./scardsData");

const returnScards = (res) =>
  setTimeout(() => {
    res.send(scards);
  }, 200);

router.get(SCARDS_URL, (req, res) => {
  if (scards == null) scards = loadJson("./scardsData");
  returnScards(res);
});

router.post(SCARDS_URL, function (req, res) {
  idCounter += 1;
  let newScard = {
    id: idCounter,
    q: req.query.q,
    a: req.query.a,
  };
  scards.push(newScard);
  returnScards(res);
});

router.get(`${SCARDS_URL}/:id`, function (req, res) {
  let scard = scards.filter((scard) => scard.id == req.params.id)[0] || {};
  setTimeout(() => {
    res.send(scard);
  }, 200);
});

router.put(`${SCARDS_URL}/:id`, function (req, res) {
  let replacementScard = {
    q: req.query.q,
    a: req.query.a,
  };
  scards = scards.map((scard) =>
    req.params.id != scard.id ? scard : { id: scard.id, ...replacementScard }
  );
  returnScards(res);
});

router.delete(`${SCARDS_URL}/:id`, function (req, res) {
  scards = scards.filter((scard) => scard.id != req.params.id);
  returnScards(res);
});

module.exports = router;
