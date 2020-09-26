const setSessionId = (newSessionId) => {
  localStorage.setItem("sessionId", newSessionId);
};

const getSessionId = () => {
  let ret = localStorage.getItem("sessionId");
  if (ret == "") ret = "null";
  return ret;
};

export { setSessionId, getSessionId };
