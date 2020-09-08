import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { authHeader } from "@main/__data__/helpers/auth-header";
import { getConfig } from "@ijl/cli";

const mainApiBaseUrl = getConfig()["main.api.base.url"];

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

export { getData, getScards };
