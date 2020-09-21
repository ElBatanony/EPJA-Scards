import React from "react";
import { Stack } from "@fluentui/react";
import { Text } from "office-ui-fabric-react";

export interface TitleBarProps {}

export interface TitleBarState {}

class TitleBar extends React.Component<TitleBarProps, TitleBarState> {
  constructor(props: TitleBarProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Stack horizontalAlign="center">
        <Text variant="superLarge">Welcome to Scards!</Text> <br />
        <Text variant="large">EPJA Project by Ahmed ElBatanony</Text> <br />
        <Text variant="medium">Scards = study card ;)</Text>
      </Stack>
    );
  }
}

export default TitleBar;
