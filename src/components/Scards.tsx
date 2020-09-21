import React from "react";
import { getScards, addScard } from "@main/data/main";

import Scard from "@main/components/Scard";

import {
  DialogType,
  PrimaryButton,
  Spinner,
  Stack,
} from "office-ui-fabric-react";

import ScardDialogForm from "./ScardDialogForm";

interface ScardsProps {}

interface ScardsState {
  scards?: Array<any>;
  addScardDialogHidden: boolean;
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
      addScardDialogHidden: true,
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

  toggleAddDialog = () => {
    this.setState((state, props) => ({
      addScardDialogHidden: !state.addScardDialogHidden,
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
        {this.state.scards &&
          this.state.scards.map((scard) => (
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
            {this.state.scards ? scardsComps : <Spinner size={3} />}
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton text="Add Scard" onClick={this.toggleAddDialog} />
          </Stack.Item>
        </Stack>
        <ScardDialogForm
          hidden={this.state.addScardDialogHidden}
          scard={{ newQ: "", newA: "" }}
          dialogContentProps={AddDialogContentProps}
          toggleDialog={this.toggleAddDialog}
          action={this.addScard}
        />
      </>
    );
  }
}

export default Scards;
