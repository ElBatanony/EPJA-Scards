import React from "react";

import { Stack } from "@fluentui/react";

import TitleBar from "@main/components/TitleBar";
import Messages from "@main/components/Messages";
import Scards from "@main/components/Scards";

const sum = (a, b) => a + b;
export { sum };

export default () => {
  document.title = "EPJA Scards";
  return (
    <Stack tokens={{ childrenGap: 15, padding: 15 }}>
      <TitleBar />
      <Messages />
      <Scards />
    </Stack>
  );
};
