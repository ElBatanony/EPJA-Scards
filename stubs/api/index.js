const router = require("express").Router();
const scardsRoute = require("./scards");
const workflowRoute = require("./workflow");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://89.223.91.151:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/testData", (req, res) => {
  res.send({ status: 200, msg: "Test API Ok" });
});

router.use(scardsRoute);
router.use(workflowRoute);

module.exports = router;
