const router = require("express").Router();
const workflow = require("./workflow.json");

function getSession(req) {
  return req.session;
}

function setSessionWorflow(req, workflow) {
  getSession(req).workflow = workflow;
}

router.get("/api/workflow", (req, res) => {
  const { cmd, name, data } = req.query;
  console.log(cmd, name, data);
  let flowName = name,
    stateName;
  if (cmd == "start") stateName = workflow.flows[flowName].init;
  if (cmd == "event") {
    let session = getSession(req);
    flowName = session.workflow.flowName;
    stateName =
      workflow.flows[flowName].states[session.workflow.stateName].events[name]
        .newState;
  }

  setSessionWorflow(req, {
    flowName,
    stateName,
  });
  res.send({ flowName, stateName });
});

module.exports = router;
