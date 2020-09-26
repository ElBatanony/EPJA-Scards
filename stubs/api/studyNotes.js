const router = require("express").Router();
const STUDY_NOTES_URL = "/api/studyNotes";
const { delayAnswer } = require("./utils");

const {
  createSession,
  getSession,
  setSessionStudyNotes,
} = require("./sessions");

router.get(STUDY_NOTES_URL, delayAnswer, async (req, res) => {
  let sessionId = req.query.sessionId;
  console.log("Session id we have ", sessionId);
  if (sessionId === undefined || sessionId == null)
    sessionId = await createSession();
  const session = await getSession(sessionId);
  res.send({ studyNotes: session.studyNotes, sessionId });
});

router.post(STUDY_NOTES_URL, delayAnswer, async (req, res) => {
  let sessionId = req.query.sessionId;
  console.log("Session id we have ", sessionId);
  if (sessionId === undefined) sessionId = await createSession();
  let newStudyNotes = req.body.studyNotes;
  setSessionStudyNotes(sessionId, req.body);
  res.send({ studyNotes: newStudyNotes, sessionId });
});

module.exports = router;
