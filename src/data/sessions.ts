var sessionId;

const setSessionId = (newSessionId) => {
  sessionId = newSessionId;
};

const getSessionId = () => sessionId;

export { setSessionId, getSessionId };
