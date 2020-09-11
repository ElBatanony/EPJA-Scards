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

export { getData, getScards, deleteScard, addScard };