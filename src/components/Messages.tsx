import React from "react";
import { initFlow, nextState, prevState } from "@main/data/workflow";

import { Text, DefaultButton, Stack } from "office-ui-fabric-react";
import { Card } from "@uifabric/react-cards";
import { DefaultPalette } from "office-ui-fabric-react/lib/Styling";

export interface MessagesProps {}

export interface MessagesState {
  message?: string;
}

const messages = {
  loading: "Loading messages",
  message1: "Welcome! This is message1",
  message2: "Hello there! This is 2",
  message3: "Adventerous, aren't we?",
};

const stackItemStyles = {
  root: {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    padding: 5,
  },
};

class Messages extends React.Component<MessagesProps, MessagesState> {
  constructor(props: MessagesProps) {
    super(props);
    this.state = { message: "loading" };
    this.initMessages();
  }

  initMessages = async () => {
    const initState = await initFlow("welcomeFlow");
    this.setState({
      message: initState.stateName,
    });
  };

  nextMessage = async () => {
    const newState = await nextState();
    this.setState({
      message: newState.stateName,
    });
  };

  prevMessage = async () => {
    const newState = await prevState();
    this.setState({
      message: newState.stateName,
    });
  };

  render() {
    return (
      <Stack>
        <Stack horizontal horizontalAlign="space-evenly" verticalAlign="center">
          <Stack.Item>
            <DefaultButton text="Previous Message" onClick={this.prevMessage} />
          </Stack.Item>
          <Stack.Item>
            <Card horizontal tokens={{ padding: 25 }}>
              <Card.Section fill grow>
                <Text variant="large">{messages[this.state.message]}</Text>
              </Card.Section>
            </Card>
          </Stack.Item>
          <Stack.Item>
            <DefaultButton text="Next Message" onClick={this.nextMessage} />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }
}

export default Messages;
