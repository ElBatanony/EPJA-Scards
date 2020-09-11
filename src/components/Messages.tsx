import React from "react";
import { initFlow, nextState, prevState } from "@main/data/workflow";

import { Text, DefaultButton } from "office-ui-fabric-react";
import { Card } from "@uifabric/react-cards";

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
      <Card>
        <Card.Section>
          <DefaultButton text="Next Message" onClick={this.nextMessage} />
          <Text>{messages[this.state.message]}</Text>
          <DefaultButton text="Previous Message" onClick={this.prevMessage} />
        </Card.Section>
      </Card>
    );
  }
}

export default Messages;
