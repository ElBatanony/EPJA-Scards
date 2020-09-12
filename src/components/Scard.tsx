import React from "react";

import { Stack, Text, PrimaryButton } from "office-ui-fabric-react";

import { Card } from "@uifabric/react-cards";

import { deleteScard } from "@main/data/main";

export interface ScardProps {
  scard: {
    id: number;
    q: string;
    a: string;
  };
  updateScards: any;
}

export interface ScardState {}

class Scard extends React.Component<ScardProps, ScardState> {
  constructor(props: ScardProps) {
    super(props);
    this.state = {};
  }

  deleteScard = () => {
    console.log("Deleting scard", this.props.scard.id);
    deleteScard(this.props.scard.id);
    this.props.updateScards();
  };

  render() {
    return (
      <Card tokens={{ childrenMargin: 15 }}>
        <Card.Section>
          <Text variant="xLarge">{this.props.scard.q}</Text> <br />
          <Text variant="medium">{this.props.scard.a}</Text> <br />
          <PrimaryButton text="Delete" onClick={this.deleteScard} />
        </Card.Section>
      </Card>
    );
  }
}

export default Scard;
