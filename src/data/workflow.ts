import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getConfig } from "@ijl/cli";

const mainApiBaseUrl = getConfig()["scards.api.base"];

var sessionId;

const callFlow = async (cmd, name, data) => {
  let url = `${mainApiBaseUrl}/workflow?cmd=${cmd}&name=${name}`;
  if (sessionId) url += `&sessionId=${sessionId}`;
  const answer = await axios.get(url);
  return answer;
};

const initFlow = async (flowName) => {
  const answer = await callFlow("start", flowName, null);
  console.log(answer.data);
  sessionId = answer.data.sessionId!;
  return answer.data;
};

const nextState = async () => {
  const answer = await callFlow("event", "next", null);
  console.log(answer.data);
  return answer.data;
};

const prevState = async () => {
  const answer = await callFlow("event", "back", null);
  console.log(answer.data);
  return answer.data;
};

const getSessionId = () => sessionId;

export { initFlow, nextState, prevState, getSessionId };
