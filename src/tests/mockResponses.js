let scards = require("../../stubs/api/scardsData");

const initResponses = [
  [
    "GET",
    "/api/workflow",
    { cmd: "start", name: "welcomeFlow", sessionId: "null" },
    200,
    {
      flowName: "welcomeFlow",
      sessionId: "123",
      stateName: "message1",
    },
  ],
  ["GET", "/api/scards", void 0, 200, scards],
  [
    "GET",
    "/api/studyNotes",
    { sessionId: "null" },
    200,
    { studyNotes: { txt: "hello" }, sessionId: "123" },
  ],
];

const scardResponse = [["GET", "/api/scards/1", void 0, 200, scards[0]]];

let updatedScards = scards;
updatedScards[0].q = "Question 1 updated";
const updatedScardsResponse = [["PUT", "/api/scards/1", void 0, 200, scards]];

const updatedScardResponse = [
  ["GET", "/api/scards/1", void 0, 200, updatedScards[0]],
];

const nextMessageResponse = [
  [
    "GET",
    "/api/workflow",
    { cmd: "next", name: "welcomeFlow" },
    200,
    { flowName: "welcomeFlow", stateName: "message2", sessionId: "123" },
  ],
];

const previousMessageResonse = [
  [
    "GET",
    "/api/workflow",
    { cmd: "back", name: "welcomeFlow" },
    200,
    { flowName: "welcomeFlow", stateName: "message1", sessionId: "123" },
  ],
];

const studyNotesLoadResponse = [
  [
    "GET",
    "/api/studyNotes",
    { sessionId: "123" },
    200,
    { studyNotes: "", sessionId: "123" },
  ],
];

const studyNotesSaveResponse = [
  [
    "POST",
    "/api/studyNotes",
    { sessionId: "123" },
    200,
    { studyNotes: "Hello Study Notes", sessionId: "123" },
  ],
];

module.exports = {
  initResponses,
  scardResponse,
  nextMessageResponse,
  previousMessageResonse,
  studyNotesSaveResponse,
  studyNotesLoadResponse,
  updatedScardResponse,
  updatedScardsResponse,
};
