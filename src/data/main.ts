import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { authHeader } from "@main/data/auth-header";
import { getConfig } from "@ijl/cli";

const mainApiBaseUrl = getConfig()["scards.api.base"];

const getData = async () => {
  // console.log('Starting Data Actions');
  //getFetchAction();

  const requestProps: AxiosRequestConfig = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };

  try {
    const answer: AxiosResponse = await axios(
      `${mainApiBaseUrl}/getMainData`,
      requestProps
    );

    if (answer.data?.status?.code === 0) {
      //getSuccessAction(answer.data);
    } else {
      //getErrorAction();
    }
  } catch (error) {
    console.error("Axios Error", error);
    //getErrorAction();
  }
};

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

export { getData, getScards, getScard, deleteScard, addScard, editScard };
