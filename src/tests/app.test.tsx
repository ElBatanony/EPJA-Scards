import App from "../app";
import React from "react";
import { mount, configure, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import _ from "lodash";

configure({ adapter: new Adapter() });

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

describe("App Test", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it("Render and test app", async () => {
    const app = mount(<App />);

    const responses = [
      [
        "GET",
        "/api/workflow",
        { cmd: "start", name: "welcomeFlow" },
        200,
        {
          flowName: "welcomeFlow",
          sessionId: "123",
          stateName: "message1",
        },
      ],
      [
        "GET",
        "/api/scards",
        void 0,
        200,
        require("../../stubs/api/scardsData"),
      ],
      [
        "GET",
        "/api/studyNotes",
        { sessionId: "null" },
        200,
        { studyNotes: { txt: "hello" }, sessionId: "123" },
      ],
    ];

    const scardResponse = [
      [
        "GET",
        "/api/scards/1",
        void 0,
        200,
        {
          id: "1",
          q: "Question 1",
          a: "Answer 1",
        },
      ],
    ];

    await multiplyRequest(mock, responses);
    app.update();
    mock.reset();
    expect(app.find("TitleBar")).toMatchSnapshot();
    expect(app.find("Messages")).toMatchSnapshot();
    expect(app.find("Scards")).toMatchSnapshot();
    expect(app.find("StudyNotes")).toMatchSnapshot();

    //await multiplyRequest(mock, responses);

    app.find(".ms-Stack.ms-CardSection.css-86").at(0).simulate("click");
    app.update();
    await multiplyRequest(mock, scardResponse);
    app.update();
    mock.reset();
    expect(app.find("ScardPage")).toMatchSnapshot();

    // app.find(".ms-Stack.ms-CardSection.css-86").at(0).simulate("click");
    // app.update();
    // await multiplyRequest(mock, scardResponse);
    // app.update();
    // mock.reset();
    // expect(app).toMatchSnapshot();
  });
});
