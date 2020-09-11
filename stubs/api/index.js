const router = require("express").Router();
const scardsRoute = require("./scards");
const workflow = require("./workflow/workflow.json");

const delayAnswer = (req, res, next) => {
  setTimeout(next, 300);
};

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

router.get("/api/workflow", (req, res) => {
  const { cmd, name, data } = req.query;
  console.log(cmd, name, data);
  let flowName = name,
    stateName;
  if (cmd == "start") stateName = workflow.flows[flowName].init;
  if (cmd == "event") {
    flowName = req.session.workflow.flowName;
    stateName =
      workflow.flows[flowName].states[req.session.workflow.stateName].events[
        name
      ].newState;
  }

  req.session.workflow = {
    flowName,
    stateName,
  };
  res.send({ flowName, stateName });
});

router.use(scardsRoute);

module.exports = router;
