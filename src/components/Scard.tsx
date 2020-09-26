import React from "react";

import { Text, PrimaryButton, DialogType } from "office-ui-fabric-react";

import { Card } from "@uifabric/react-cards";

import { deleteScard, editScard } from "@main/data/scards";

import { Redirect } from "react-router-dom";
import ScardDialogForm from "./ScardDialogForm";

export interface ScardProps {
  scard: {
    id: string;
    q: string;
    a: string;
  };
  updateScards: any;
  inScardPage?: boolean;
}

export interface ScardState {
  editDialogHidden: boolean;
  inScardPage: boolean;
  redirectToScardPage?: boolean;
  redirectToHomepage?: boolean;
}

const EditDialogContentProps = {
  type: DialogType.normal,
  title: "Edit Scard",
  closeButtonAriaLabel: "Close",
};

class Scard extends React.Component<ScardProps, ScardState> {
  constructor(props: ScardProps) {
    super(props);
    this.state = {
      editDialogHidden: true,
      inScardPage: this.props.inScardPage ?? false,
    };
  }

  toggleEditDialog = () => {
    this.setState((state, props) => ({
      editDialogHidden: !state.editDialogHidden,
    }));
  };

  deleteScard = async () => {
    console.log("Deleting scard", this.props.scard.id);
    await deleteScard(this.props.scard.id);
    this.goToHomepage();
    //this.props.updateScards();
  };

  editScard = async (newQ, newA) => {
    console.log("Editing scard", this.props.scard.id);
    await editScard(this.props.scard.id, newQ, newA);
    this.props.updateScards();
  };

  goToScardPage = () => {
    if (this.state.inScardPage) return;
    this.setState({ redirectToScardPage: true });
  };

  goToHomepage = () => {
    this.setState({ redirectToHomepage: true });
  };

  render() {
    let scardUrl = "/scards/" + this.props.scard.id;

    if (this.state.redirectToScardPage) {
      return <Redirect push to={scardUrl} />;
    }

    if (this.state.redirectToHomepage) {
      return <Redirect push to="/scards" />;
    }

    return (
      <div className="ScardCard">
        <Card tokens={{ childrenMargin: 15 }} onClick={this.goToScardPage}>
          <Card.Section horizontalAlign="stretch">
            <Text className="ScardQ" variant="xLarge">
              {this.props.scard.q}
            </Text>{" "}
            <br />
            <Text className="ScardA" variant="medium">
              {this.props.scard.a}
            </Text>{" "}
            <br />
            {this.state.inScardPage == true && (
              <>
                <PrimaryButton
                  id={"EditScardBtn"}
                  text="Edit"
                  onClick={this.toggleEditDialog}
                />
                <PrimaryButton
                  id={"DeleteScardBtn"}
                  text="Delete"
                  onClick={this.deleteScard}
                />
              </>
            )}
          </Card.Section>
        </Card>
        <ScardDialogForm
          hidden={this.state.editDialogHidden}
          scard={this.props.scard}
          dialogContentProps={EditDialogContentProps}
          toggleDialog={this.toggleEditDialog}
          action={this.editScard}
        />
      </div>
    );
  }
}

export default Scard;
