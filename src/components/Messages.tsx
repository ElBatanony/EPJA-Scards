import React from "react";
import { initFlow, nextState, prevState } from "@main/data/workflow";

import { Text, DefaultButton, Stack, Spinner } from "office-ui-fabric-react";
import { Card } from "@uifabric/react-cards";

export interface MessagesProps {}

export interface MessagesState {
  message?: string;
}

const messages = {
  message1: "Welcome! This is message1",
  message2: "Hello there! This is 2",
  message3: "Adventerous, aren't we?",
};

const stackItemStyles = {
  root: {
    padding: 5,
  },
};

class Messages extends React.Component<MessagesProps, MessagesState> {
  constructor(props: MessagesProps) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.initMessages();
  };

  initMessages = async () => {
    const initState = await initFlow("welcomeFlow");
    this.setState({
      message: initState.stateName,
    });
  };

  nextMessage = async () => {
    this.setState({
      message: null,
    });
    const newState = await nextState();
    this.setState({
      message: newState.stateName,
    });
  };

  prevMessage = async () => {
    this.setState({
      message: null,
    });
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
            <DefaultButton
              id="PrevMsgBtn"
              text="Previous Message"
              onClick={this.prevMessage}
            />
          </Stack.Item>
          <Stack.Item>
            <Card horizontal tokens={{ padding: 25 }}>
              <Card.Section fill grow>
                {this.state.message == undefined ? (
                  <Spinner size={3} />
                ) : (
                  <Text id="MsgText" variant="large">
                    {messages[this.state.message]}
                  </Text>
                )}
              </Card.Section>
            </Card>
          </Stack.Item>
          <Stack.Item>
            <DefaultButton
              id="NextMsgBtn"
              text="Next Message"
              onClick={this.nextMessage}
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }
}

export default Messages;
