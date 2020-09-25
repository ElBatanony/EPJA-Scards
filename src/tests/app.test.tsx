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

    const nextMessageResponse = [
      [
        "GET",
        "/api/workflow",
        { cmd: "next", name: "welcomeFlow" },
        200,
        { flowName: "welcomeFlow", stateName: "message2", sessionId: "123" },
      ],
    ];

    const previousMessageResonse = [
      [
        "GET",
        "/api/workflow",
        { cmd: "back", name: "welcomeFlow" },
        200,
        { flowName: "welcomeFlow", stateName: "message1", sessionId: "123" },
      ],
    ];

    const studyNotesSaveResponse = [
      [
        "POST",
        "/api/studyNotes",
        { sessionId: "123" },
        200,
        { studyNotes: "Hello Study Notes", sessionId: "123" },
      ],
    ];

    const studyNotesLoadResponse = [
      [
        "GET",
        "/api/studyNotes",
        { sessionId: "123" },
        200,
        { studyNotes: "Hello Study Notes", sessionId: "123" },
      ],
    ];

    await multiplyRequest(mock, responses);
    app.update();
    mock.reset();

    // Inital state check
    expect(app.find("TitleBar")).toMatchSnapshot();
    expect(app.find("Messages")).toMatchSnapshot();
    expect(app.find("Scards")).toMatchSnapshot();
    expect(app.find("StudyNotes")).toMatchSnapshot();

    // Clicking on Next Message
    app.find("#id__3").simulate("click");
    app.update();
    await multiplyRequest(mock, nextMessageResponse);
    app.update();
    mock.reset();
    expect(app.find("Messages")).toMatchSnapshot();

    // Clicking on Previous Message
    app.find("#id__0").simulate("click");
    app.update();
    await multiplyRequest(mock, previousMessageResonse);
    app.update();
    mock.reset();
    expect(app.find("Messages")).toMatchSnapshot();

    // Modifying, saving, and loading study notes
    // Step 1: Modify and Save
    app
      .find("#TextField11")
      .simulate("change", { target: { value: "Hello Study Notes" } });
    app.update();
    await multiplyRequest(mock, studyNotesSaveResponse);
    app.update();
    mock.reset();
    expect(app.find("StudyNotes")).toMatchSnapshot();
    // Step 2: Modify and Load
    app
      .find("#TextField11")
      .simulate("change", { target: { value: "Something Different" } });
    app.update();
    await multiplyRequest(mock, studyNotesLoadResponse);
    app.update();
    mock.reset();
    expect(app.find("StudyNotes")).toMatchSnapshot();

    // Selecting the first scard
    app.find(".ms-Stack.ms-CardSection.css-86").at(0).simulate("click");
    app.update();
    await multiplyRequest(mock, scardResponse);
    app.update();
    mock.reset();
    expect(app.find("ScardPage")).toMatchSnapshot();

    // Click Edit Scard and Cancel
    app.find("#id__33").simulate("click"); // Edit Button
    app.update();
    expect(app.find(".content-100")).toMatchSnapshot();
    app.find("#id__50").simulate("click"); // Cancel Button
    app.update();
    expect(app.find(".ms-Stack.ms-CardSection.css-86")).toMatchSnapshot();
  });
});
