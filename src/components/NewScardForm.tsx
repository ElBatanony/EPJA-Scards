import React from "react";

import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Card } from "@uifabric/react-cards";
import { PrimaryButton } from "office-ui-fabric-react";

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
  };

  updateQ = (event) => {
    this.setState({ q: event.target.value });
  };

  updateA = (event) => {
    this.setState({ a: event.target.value });
  };

  render() {
    return (
      <Card>
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
    );
  }
}

export default NewScardForm;
