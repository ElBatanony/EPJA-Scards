import React from "react";

import { Stack, Text, PrimaryButton } from "office-ui-fabric-react";

import { deleteScard } from "@main/__data__/actions/main";

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
      <Stack>
        <Stack.Item>
          <div>
            <Text variant="xLarge">{this.props.scard.q}</Text>
          </div>
          <div>
            <Text variant="medium">{this.props.scard.a}</Text>
          </div>
          <PrimaryButton
            text="Delete"
            onClick={this.deleteScard}
            allowDisabledFocus
          />
        </Stack.Item>
      </Stack>
    );
  }
}

export default Scard;
