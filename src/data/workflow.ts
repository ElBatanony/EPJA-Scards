import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getConfig } from "@ijl/cli";

const mainApiBaseUrl = getConfig()["scards.api.base"];

const callFlow = async (cmd, name, data) => {
  const url = `${mainApiBaseUrl}/workflow?cmd=${cmd}&name=${name}`;
  const answer = await axios.get(url);
  return answer;
};

const initFlow = async (flowName) => {
  const answer = await callFlow("start", flowName, null);
  console.log(answer.data);
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

export { initFlow, nextState, prevState };
