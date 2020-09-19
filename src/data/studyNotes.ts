import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getConfig } from "@ijl/cli";
import { getSessionId } from "./sessions";

const mainApiBaseUrl = getConfig()["scards.api.base"];

const getStudyNotes = async () => {
  let url = `${mainApiBaseUrl}/studyNotes?sessionId=${getSessionId()}`;
  const answer = await axios.get(url);
  return answer.data.studyNotes || {};
};

const saveStudyNotes = async (newStudyNotes) => {
  let url = `${mainApiBaseUrl}/studyNotes?sessionId=${getSessionId()}`;
  return axios.post(url, newStudyNotes);
};

export { getStudyNotes, saveStudyNotes };
