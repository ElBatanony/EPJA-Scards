import React from "react";
import { getScards, addScard } from "@main/data/main";

import Scard from "@main/components/Scard";

import { DialogType, PrimaryButton, Stack, Text } from "office-ui-fabric-react";

import NewScardForm from "@main/components/NewScardForm";
import ScardDialogForm from "./ScardDialogForm";

interface ScardsProps {}

interface ScardsState {
  hello?: string;
  scards: Array<any>;
  editDialogHidden: boolean;
}

const AddDialogContentProps = {
  type: DialogType.normal,
  title: "Add Scard",
  closeButtonAriaLabel: "Close",
};

class Scards extends React.Component<ScardsProps, ScardsState> {
  state: ScardsState;

  constructor(props) {
    super(props);
    this.state = {
      hello: "No Scards",
      scards: [],
      editDialogHidden: true,
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

  toggleEditDialog = () => {
    this.setState((state, props) => ({
      editDialogHidden: !state.editDialogHidden,
    }));
  };

  render() {
    let scardsComps = (
      <Stack
        horizontal
        wrap
        horizontalAlign="center"
        tokens={{ childrenGap: 10, padding: 10 }}
      >
        {this.state.scards.map((scard) => (
          <Stack.Item key={scard.id}>
            <Scard scard={scard} updateScards={this.updateScards} />
          </Stack.Item>
        ))}
      </Stack>
    );

    return (
      <>
        <Stack
          tokens={{ childrenGap: 10, padding: 10 }}
          horizontalAlign="center"
        >
          <Stack.Item>
            {this.state.scards.length == 0 ? (
              <Text>Loading ...</Text>
            ) : (
              scardsComps
            )}
          </Stack.Item>
          {/* <NewScardForm addScard={this.addScard} /> */}
          <Stack.Item>
            <PrimaryButton text="Add Scard" onClick={this.toggleEditDialog} />
          </Stack.Item>
        </Stack>
        <ScardDialogForm
          hidden={this.state.editDialogHidden}
          scard={{ newQ: "", newA: "" }}
          dialogContentProps={AddDialogContentProps}
          toggleDialog={this.toggleEditDialog}
          action={this.addScard}
        />
      </>
    );
  }
}

export default Scards;
