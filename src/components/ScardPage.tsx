import React from "react";

import { getScard } from "@main/data/main";

import { DefaultButton } from "@fluentui/react";

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
    this.getScard();
  }

  getScard = async () => {
    console.log("Fetching scard");
    let scardRet = await getScard(this.props.scardId);
    this.setState({
      scard: scardRet,
    });
    console.log("We got the scard!");
  };

  goBack = () => {
    console.log("I do nothing for now");
  };

  render() {
    let id = this.props.scardId;
    return (
      <div>
        <Link to="/">
          <DefaultButton text="Back" />
        </Link>
        {this.state.scard != null && (
          <Scard scard={this.state.scard} updateScards={this.goBack} />
        )}
      </div>
    );
  }
}

export default ScardPage;
