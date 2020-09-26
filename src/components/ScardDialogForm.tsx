import React from "react";

import {
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
  TextField,
} from "@fluentui/react";

export interface ScardDialogFormProps {
  hidden: boolean;
  toggleDialog;
  dialogContentProps;
  action;
  scard;
}

export interface ScardDialogFormState {
  newQ: string;
  newA: string;
}

class ScardDialogForm extends React.Component<
  ScardDialogFormProps,
  ScardDialogFormState
> {
  constructor(props: ScardDialogFormProps) {
    super(props);
    this.state = {
      newQ: this.props.scard.q,
      newA: this.props.scard.a,
    };
  }

  updateQ = (event) => {
    this.setState({ newQ: event.target.value });
  };

  updateA = (event) => {
    this.setState({ newA: event.target.value });
  };

  applyAction = () => {
    this.props.toggleDialog();
    this.props.action(this.state.newQ, this.state.newA);
  };

  render() {
    return (
      <div id={"ScardDialog"}>
        <Dialog
          hidden={this.props.hidden}
          onDismiss={this.props.toggleDialog}
          dialogContentProps={this.props.dialogContentProps}
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
            <PrimaryButton
              id="ScardDialogActionBtn"
              onClick={this.applyAction}
              text="Save"
            />
            <DefaultButton
              id={"ScardDialogCancelBtn"}
              onClick={this.props.toggleDialog}
              text="Cancel"
            />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

export default ScardDialogForm;
