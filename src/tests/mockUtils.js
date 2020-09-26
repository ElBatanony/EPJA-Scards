import { configure } from "enzyme";
import { act } from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import _ from "lodash";

configure({ adapter: new Adapter() });

const initMock = () => {
  return new MockAdapter(axios);
};

const multiplyRequest = async (mock, responses) => {
  await act(async () => {
    await mock.onAny().reply((config) => {
      // console.log("responses", responses);
      const [method, url, params, ...response] = responses.shift();
      // console.log("config", config);
      if (config.url.includes(url) && config.method.toUpperCase() === method) {
        if (!config.params || _.isEqual(config.params, params)) return response;
        console.log(config.params, params);
        return [500, {}];
      }
      console.log(config.url, config.method);
      return [500, {}];
    });
  });
};

const makeRequest = async (comp, mock, req) => {
  comp.update();
  await multiplyRequest(mock, req);
  comp.update();
  mock.reset();
};

export { initMock, makeRequest };
