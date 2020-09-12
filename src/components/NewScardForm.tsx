import React from "react";

import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Card, ICardItemTokens } from "@uifabric/react-cards";
import { PrimaryButton, Stack } from "office-ui-fabric-react";

export interface NewScardFormProps {
  addScard: any;
}

export interface NewScardFormState {
  q: string;
  a: string;
}

class NewScardForm extends React.Component<
  NewScardFormProps,
  NewScardFormState
> {
  constructor(props: NewScardFormProps) {
    super(props);
    this.state = {
      q: "",
      a: "",
    };
  }

  addScard = () => {
    this.props.addScard(this.state.q, this.state.a);
    this.setState({ q: "", a: "" });
  };

  updateQ = (event) => {
    this.setState({ q: event.target.value });
  };

  updateA = (event) => {
    this.setState({ a: event.target.value });
  };

  render() {
    return (
      <Stack horizontalAlign="center">
        <Card tokens={{ padding: 15 }}>
          <Card.Section>
            <TextField
              id="newScardQuestion"
              label="Question"
              value={this.state.q}
              onChange={this.updateQ}
            />
            <TextField
              id="newScardAnswer"
              label="Answer"
              multiline
              rows={3}
              value={this.state.a}
              onChange={this.updateA}
            />
            <PrimaryButton text="Add Scard" onClick={this.addScard} />
          </Card.Section>
        </Card>
      </Stack>
    );
  }
}

export default NewScardForm;
