import axios, { AxiosResponse } from "axios";
import { getConfig } from "@ijl/cli";

const mainApiBaseUrl = getConfig()["scards.api.base"];

const getScards = async () => {
  const answer: AxiosResponse = await axios(`${mainApiBaseUrl}/scards`);
  console.log(answer.data);
  return answer.data as Array<any>;
};

const getScard = async (scardId) => {
  const answer: AxiosResponse = await axios(
    `${mainApiBaseUrl}/scards/${scardId}`
  );
  console.log(answer.data);
  return answer.data;
};

const deleteScard = async (scardId) => {
  const answer: AxiosResponse = await axios.delete(
    `${mainApiBaseUrl}/scards/${scardId}`
  );
  return answer.data as Array<any>;
};

const addScard = async (q, a) => {
  const answer: AxiosResponse = await axios.post(`${mainApiBaseUrl}/scards`, {
    q,
    a,
  });
  return answer.data as Array<any>;
};

const editScard = async (scardId, q, a) => {
  const answer: AxiosResponse = await axios.put(
    `${mainApiBaseUrl}/scards/${scardId}`,
    { q, a }
  );
  console.log(answer.data);
  return answer.data;
};

export { getScards, getScard, deleteScard, addScard, editScard };
