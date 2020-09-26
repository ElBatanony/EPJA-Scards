const router = require("express").Router();
const workflow = require("./workflow.json");
const { v4: uuidv4 } = require("uuid");
const { delayAnswer } = require("../utils");

const {
  createSession,
  getSession,
  setSessionWorkflow,
} = require("./../sessions");

router.get("/api/workflow", delayAnswer, async (req, res) => {
  const { cmd, name, data } = req.query;
  let sessionId = req.query.sessionId;
  if (sessionId === undefined) {
    sessionId = await createSession();
  }
  console.log(cmd, name, data, sessionId);
  let flowName = name,
    stateName;
  if (cmd == "start") stateName = workflow.flows[flowName].init;
  if (cmd == "event") {
    const session = await getSession(sessionId);
    flowName = session.workflow.flowName;
    stateName =
      workflow.flows[flowName].states[session.workflow.stateName].events[name]
        .newState;
  }

  await setSessionWorkflow(sessionId, {
    flowName,
    stateName,
  });
  res.send({ flowName, stateName, sessionId });
});

module.exports = router;
