import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getConfig } from "@ijl/cli";
import { setSessionId, getSessionId } from "./sessions";

const mainApiBaseUrl = getConfig()["scards.api.base"];

const getStudyNotes = async () => {
  let url = `${mainApiBaseUrl}/studyNotes?sessionId=${getSessionId()}`;
  const answer = await axios.get(url);
  setSessionId(answer.data.sessionId);
  return answer.data.studyNotes || {};
};

const saveStudyNotes = async (newStudyNotes) => {
  let url = `${mainApiBaseUrl}/studyNotes?sessionId=${getSessionId()}`;
  const answer = await axios.post(url, newStudyNotes);
  setSessionId(answer.data.sessionId);
  return answer;
};

export { getStudyNotes, saveStudyNotes };
