import React from "react";

import { getScard } from "@main/data/scards";

import { DefaultButton, Spinner, Stack } from "@fluentui/react";

import { Link } from "react-router-dom";
import Scard from "./Scard";

export interface ScardPageProps {
  scardId: string;
}

export interface ScardPageState {
  scard: any;
}

class ScardPage extends React.Component<ScardPageProps, ScardPageState> {
  constructor(props: ScardPageProps) {
    super(props);
    this.state = {
      scard: null,
    };
  }

  componentDidMount() {
    this.getScard();
  }

  getScard = async () => {
    console.log("Fetching scard");
    let scardRet = await getScard(this.props.scardId);
    this.setState({
      scard: scardRet,
    });
    console.log("We got the scard!", this.state.scard);
  };

  render() {
    let id = this.props.scardId;

    return (
      <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          {this.state.scard != null ? (
            <Scard
              scard={this.state.scard}
              updateScards={this.getScard}
              inScardPage={true}
            />
          ) : (
            <Spinner size={3} />
          )}
        </Stack.Item>
        <Stack.Item>
          <Link to="/scards">
            <DefaultButton text="Back" />
          </Link>
        </Stack.Item>
      </Stack>
    );
  }
}

export default ScardPage;
