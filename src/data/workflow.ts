import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getConfig } from "@ijl/cli";

const mainApiBaseUrl = getConfig()["scards.api.base"];

const callFlow = async (cmd, name, data, sessionId) => {
  let url = `${mainApiBaseUrl}/workflow?cmd=${cmd}&name=${name}`;
  if (sessionId) url += `&sessionId=${sessionId}`;
  const answer = await axios.get(url);
  return answer;
};

const initFlow = async (flowName) => {
  const answer = await callFlow("start", flowName, null, null);
  console.log(answer.data);
  return answer.data;
};

const nextState = async (sessionId) => {
  const answer = await callFlow("event", "next", null, sessionId);
  console.log(answer.data);
  return answer.data;
};

const prevState = async (sessionId) => {
  const answer = await callFlow("event", "back", null, sessionId);
  console.log(answer.data);
  return answer.data;
};

export { initFlow, nextState, prevState };
