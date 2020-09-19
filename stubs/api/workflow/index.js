const router = require("express").Router();
const workflow = require("./workflow.json");
const { v4: uuidv4 } = require("uuid");

const sessions = {};

const createSession = async () => {
  let newSessionId = uuidv4();
  sessions[newSessionId] = {};
  return newSessionId;
};

const getSession = async (sessionId) => {
  return sessions[sessionId] || {};
};

const setSessionWorflow = async (sessionId, newWorkflow) => {
  const session = await getSession(sessionId);
  session.workflow = newWorkflow;
  sessions[sessionId] = session;
  console.log("Saved workflow session", sessions[sessionId]);
  return;
};

router.get("/api/workflow", async (req, res) => {
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

  await setSessionWorflow(sessionId, {
    flowName,
    stateName,
  });
  res.send({ flowName, stateName, sessionId });
});

module.exports = router;
