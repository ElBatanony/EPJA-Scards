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

const setSessionWorkflow = async (sessionId, newWorkflow) => {
  const session = await getSession(sessionId);
  session.workflow = newWorkflow;
  sessions[sessionId] = session;
  console.log("Saved workflow session", sessions[sessionId]);
  return;
};

const setSessionStudyNotes = async (sessionId, newStudyNotes) => {
  sessions[sessionId].studyNotes = newStudyNotes;
};

module.exports = {
  createSession,
  getSession,
  setSessionWorkflow,
  setSessionStudyNotes,
};
