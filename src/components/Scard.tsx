import React from "react";

import { Stack, Text } from "office-ui-fabric-react";

export interface ScardProps {
  scard: {
    id: number;
    q: string;
    a: string;
  };
}

export interface ScardState {}

class Scard extends React.Component<ScardProps, ScardState> {
  constructor(props: ScardProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Stack>
        <Stack.Item>
          <div>
            <Text variant="xLarge">Q: {this.props.scard.q}</Text>
          </div>
          <div>
            <Text variant="medium">{this.props.scard.a}</Text>
          </div>
        </Stack.Item>
      </Stack>
    );
  }
}

export default Scard;
