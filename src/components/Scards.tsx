import React from "react";
import { getScards } from "@main/__data__/actions/main";

import Scard from "@main/components/Scard";

import { Card } from "@uifabric/react-cards";

import { Text } from "office-ui-fabric-react";

interface ScardsProps {}

interface ScardsState {
  hello?: string;
  scards: Array<any>;
}

class Scards extends React.Component<ScardsProps, ScardsState> {
  state: ScardsState;

  constructor(props) {
    super(props);
    this.state = {
      hello: "No Scards",
      scards: [],
    };
    this.displayScards();
  }

  displayScards = async () => {
    let scardsRet = await getScards();
    this.setState({
      scards: scardsRet,
    });
    console.log("We got scards!");
  };

  render() {
    return (
      <Card>
        {this.state.scards.length == 0 ? (
          <Card.Item>
            <Text>Loading ...</Text>
          </Card.Item>
        ) : (
          this.state.scards.map((scard) => (
            <Card.Section key={scard.id}>
              <Scard scard={scard} />
            </Card.Section>
          ))
        )}
      </Card>
    );
  }
}

export default Scards;
