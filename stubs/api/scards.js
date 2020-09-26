const router = require("express").Router();
const bodyParser = require("body-parser");
const { query } = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { delayAnswer } = require("./utils");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const SCARDS_URL = "/api/scards";
let idCounter = 10;

var scards;

const loadJson = (filepath, encoding = "utf8") =>
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `${filepath}.json`), { encoding })
  );

scards = loadJson("./scardsData");

router.get(SCARDS_URL, delayAnswer, (req, res) => {
  if (scards == null) scards = loadJson("./scardsData");
  res.send(scards);
});

router.post(SCARDS_URL, delayAnswer, function (req, res) {
  console.log("Adding new Scard", req.body);
  let newScard = {
    id: uuidv4(),
    q: req.body.q,
    a: req.body.a,
  };
  scards.push(newScard);
  res.send(scards);
});

router.get(`${SCARDS_URL}/:id`, delayAnswer, function (req, res) {
  let scard = scards.filter((scard) => scard.id == req.params.id)[0] || {};
  res.send(scard);
});

router.put(`${SCARDS_URL}/:id`, delayAnswer, function (req, res) {
  console.log("Editing scard", req.body);
  let replacementScard = {
    q: req.body.q,
    a: req.body.a,
  };
  scards = scards.map((scard) =>
    req.params.id != scard.id ? scard : { id: scard.id, ...replacementScard }
  );
  res.send(scards);
});

router.delete(`${SCARDS_URL}/:id`, delayAnswer, function (req, res) {
  scards = scards.filter((scard) => scard.id != req.params.id);
  res.send(scards);
});

module.exports = router;
