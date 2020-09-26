import App from "../app";
import React from "react";
import { mount } from "enzyme";

import { initMock, makeRequest } from "./mockUtils";

import {
  initResponses,
  nextMessageResponse,
  previousMessageResonse,
  scardResponse,
  studyNotesLoadResponse,
  studyNotesSaveResponse,
  updatedScardResponse,
  updatedScardsResponse,
} from "./mockResponses";

describe("App Test", () => {
  let mock;

  beforeEach(() => {
    mock = initMock();
  });

  it("Render and test app", async () => {
    const app = mount(<App />);

    await makeRequest(app, mock, initResponses);

    // Inital state check
    expect(app.find("Text#welcomeToScards")).toMatchSnapshot();
    expect(app.find("Text#MsgText")).toMatchSnapshot();
    expect(app.find(".ScardQ")).toMatchSnapshot();
    expect(app.find("textarea#StudyNotesTextField")).toMatchSnapshot();
    expect(app.find(".ScardCard")).toHaveLength(5);

    // Clicking on Next Message
    app.find("button#NextMsgBtn").simulate("click");
    await makeRequest(app, mock, nextMessageResponse);
    expect(app.find("Text#MsgText")).toMatchSnapshot();

    // Clicking on Previous Message
    app.find("button#PrevMsgBtn").simulate("click");
    await makeRequest(app, mock, previousMessageResonse);
    expect(app.find("Text#MsgText")).toMatchSnapshot();

    // Loading, modifying and saving study notes
    app.find("button#LoadStudyNotes").simulate("click");
    await makeRequest(app, mock, studyNotesLoadResponse);
    app
      .find("textarea#StudyNotesTextField")
      .simulate("change", { target: { value: "Hello Study Notes" } });
    app.find("button#SaveStudyNotes").simulate("click");
    await makeRequest(app, mock, studyNotesSaveResponse);
    expect(app.find("textarea#StudyNotesTextField")).toMatchSnapshot();

    // Selecting the first scard
    app.find(".ScardCard").at(0).find('Stack[role="button"]').simulate("click");
    await makeRequest(app, mock, scardResponse);
    expect(app.find(".ScardCard")).toHaveLength(1);

    // Edit Scard
    app.find("button#EditScardBtn").simulate("click");
    app.update();
    expect(
      app.find("#ScardDialog").find("input#newScardQuestion")
    ).toMatchSnapshot();
    app
      .find("input#newScardQuestion")
      .simulate("change", { target: { value: "Question 1 updated" } });
    app.update();
    app.find("button#ScardDialogActionBtn").simulate("click");
    await makeRequest(app, mock, [
      updatedScardsResponse[0],
      updatedScardResponse[0],
    ]);
    expect(app.find(".ScardQ")).toMatchSnapshot();
  });
});
