import React from "react";
import Scards from "@main/components/Scards";
import { Stack } from "@fluentui/react";
import { Text } from "office-ui-fabric-react";

const sum = (a, b) => a + b;
export { sum };

export default () => {
  document.title = "EPJA Scards";
  return (
    <Stack horizontalAlign="center" tokens={{ childrenGap: 5, padding: 10 }}>
      <Stack.Item>
        <Text variant="superLarge">Welcome to Scards!</Text>
      </Stack.Item>
      <Scards />
    </Stack>
  );
};
