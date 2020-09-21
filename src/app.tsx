import React from "react";

import { Stack } from "@fluentui/react";

import TitleBar from "@main/components/TitleBar";
import Messages from "@main/components/Messages";
import Scards from "@main/components/Scards";
import ScardPage from "@main/components/ScardPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import StudyNotes from "./components/StudyNotes";

const sum = (a, b) => a + b;
export { sum };

export default () => {
  document.title = "EPJA Scards";
  return (
    <Stack tokens={{ childrenGap: 15, padding: 15 }}>
      <TitleBar />
      <Messages />
      <Router>
        <Switch>
          <Route path="/scards/:id" children={<ScardPageRoute />} />
          <Route path="/">
            <Scards />
          </Route>
        </Switch>
      </Router>
      <StudyNotes />
    </Stack>
  );
};

function ScardPageRoute() {
  let { id } = useParams();
  return <ScardPage scardId={id}></ScardPage>;
}
