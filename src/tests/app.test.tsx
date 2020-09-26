import App from "../app";
import React from "react";
import { mount, configure, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import _ from "lodash";
import {
  initResponses,
  nextMessageResponse,
  previousMessageResonse,
  scardResponse,
  studyNotesSaveResponse,
} from "./mockResponses";

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

    await multiplyRequest(mock, initResponses);
    app.update();
    mock.reset();

    // Inital state check
    expect(app.find("Text#welcomeToScards")).toMatchSnapshot();
    expect(app.find("Text#MsgText")).toMatchSnapshot();
    expect(app.find("Text#ScardQ1")).toMatchSnapshot();
    expect(app.find("Text#ScardA1")).toMatchSnapshot();
    expect(app.find("textarea#StudyNotesTextField")).toMatchSnapshot();
    expect(app.find(".ScardCard")).toHaveLength(5);

    // Clicking on Next Message
    app.find("button#NextMsgBtn").simulate("click");
    app.update();
    await multiplyRequest(mock, nextMessageResponse);
    app.update();
    mock.reset();
    expect(app.find("Text#MsgText")).toMatchSnapshot();

    // Clicking on Previous Message
    app.find("button#PreviousMsgBtn").simulate("click");
    app.update();
    await multiplyRequest(mock, previousMessageResonse);
    app.update();
    mock.reset();
    expect(app.find("Text#MsgText")).toMatchSnapshot();

    // Modifying and saving study notes
    app
      .find("textarea#StudyNotesTextField")
      .simulate("change", { target: { value: "Hello Study Notes" } });
    app.update();
    app.find("button#SaveStudyNotes").simulate("click");
    app.update();
    await multiplyRequest(mock, studyNotesSaveResponse);
    app.update();
    mock.reset();
    expect(app.find("textarea#StudyNotesTextField")).toMatchSnapshot();

    // Selecting the first scard
    app.find("#ScardCard1").find('Stack[role="button"]').simulate("click");
    app.update();
    await multiplyRequest(mock, scardResponse);
    app.update();
    mock.reset();
    expect(app.find(".ScardCard")).toHaveLength(1);

    // Click Edit Scard and Cancel
    app.find("button#EditScardBtn1").simulate("click");
    app.update();
    expect(
      app.find("#ScardDialog1").find("input#newScardQuestion")
    ).toMatchSnapshot();
    app.find("button#ScardDialogCancelBtn1").simulate("click");
    app.update();
    expect(app.find("Text#ScardQ1")).toMatchSnapshot();
  });
});
