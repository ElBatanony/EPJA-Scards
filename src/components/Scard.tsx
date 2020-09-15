import React from "react";

import {
  Text,
  PrimaryButton,
  DefaultButton,
  TextField,
} from "office-ui-fabric-react";

import { Card } from "@uifabric/react-cards";

import { deleteScard, editScard } from "@main/data/main";

import { Link } from "react-router-dom";

import {
  Dialog,
  DialogType,
  DialogFooter,
} from "office-ui-fabric-react/lib/Dialog";

export interface ScardProps {
  scard: {
    id: number;
    q: string;
    a: string;
  };
  updateScards: any;
  inScardPage?: boolean;
}

export interface ScardState {
  editDialogHidden: boolean;
  newQ: string;
  newA: string;
  inScardPage: boolean;
}

const dialogContentProps = {
  type: DialogType.normal,
  title: "Edit Scard",
  closeButtonAriaLabel: "Close",
  // subText: "Do you want to send this message without a subject?",
};

class Scard extends React.Component<ScardProps, ScardState> {
  constructor(props: ScardProps) {
    super(props);
    this.state = {
      editDialogHidden: true,
      newQ: this.props.scard.q,
      newA: this.props.scard.a,
      inScardPage: this.props.inScardPage ?? false,
    };
  }

  toggleEditDialog = () => {
    this.setState((state, props) => ({
      editDialogHidden: !state.editDialogHidden,
    }));
  };

  deleteScard = () => {
    console.log("Deleting scard", this.props.scard.id);
    deleteScard(this.props.scard.id);
    this.props.updateScards();
  };

  editScard = async () => {
    console.log("Editing scard", this.props.scard.id);
    await editScard(this.props.scard.id, this.state.newQ, this.state.newA);
    this.toggleEditDialog();
    this.props.updateScards();
  };

  updateQ = (event) => {
    this.setState({ newQ: event.target.value });
  };

  updateA = (event) => {
    this.setState({ newA: event.target.value });
  };

  render() {
    let scardUrl = "/scards/" + this.props.scard.id;
    return (
      <>
        <Card tokens={{ childrenMargin: 15 }}>
          <Card.Section horizontalAlign="stretch">
            <Text variant="xLarge">{this.props.scard.q}</Text> <br />
            <Text variant="medium">{this.props.scard.a}</Text> <br />
            {this.state.inScardPage == false && (
              <Link to={scardUrl}>
                <PrimaryButton text="Open" />
              </Link>
            )}
            <PrimaryButton text="Edit" onClick={this.toggleEditDialog} />
            <PrimaryButton text="Delete" onClick={this.deleteScard} />
          </Card.Section>
        </Card>

        <Dialog
          hidden={this.state.editDialogHidden}
          onDismiss={this.toggleEditDialog}
          dialogContentProps={dialogContentProps}
        >
          <TextField
            id="newScardQuestion"
            label="Question"
            value={this.state.newQ}
            onChange={this.updateQ}
          />
          <TextField
            id="newScardAnswer"
            label="Answer"
            multiline
            rows={3}
            value={this.state.newA}
            onChange={this.updateA}
          />
          <DialogFooter>
            <PrimaryButton onClick={this.editScard} text="Save" />
            <DefaultButton onClick={this.toggleEditDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </>
    );
  }
}

export default Scard;
