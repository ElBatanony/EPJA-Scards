import React from "react";
import { getScards, addScard } from "@main/__data__/actions/main";

import Scard from "@main/components/Scard";

import { Card } from "@uifabric/react-cards";

import { Stack, Text } from "office-ui-fabric-react";

import NewScardForm from "@main/components/NewScardForm";

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
    this.updateScards();
  }

  updateScards = async () => {
    console.log("Fetching scards");
    let scardsRet = await getScards();
    this.setState({
      scards: scardsRet,
    });
    console.log("We got scards!");
  };

  addScard = async (q, a) => {
    console.log("Adding scard", q, a);
    await addScard(q, a);
    this.updateScards();
  };

  render() {
    return (
      <Stack>
        <Stack.Item>
          <Card>
            {this.state.scards.length == 0 ? (
              <Card.Item>
                <Text>Loading ...</Text>
              </Card.Item>
            ) : (
              this.state.scards.map((scard) => (
                <Card.Section key={scard.id}>
                  <Scard scard={scard} updateScards={this.updateScards} />
                </Card.Section>
              ))
            )}
          </Card>
        </Stack.Item>
        <Stack.Item>
          <NewScardForm addScard={this.addScard} />
        </Stack.Item>
      </Stack>
    );
  }
}

export default Scards;
