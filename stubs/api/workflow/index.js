const router = require("express").Router();
const workflow = require("./workflow.json");

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

module.exports = router;
