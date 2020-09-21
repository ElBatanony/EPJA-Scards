import {
  TextField,
  Text,
  Stack,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import { Card } from "@uifabric/react-cards";
import * as React from "react";
import { getStudyNotes, saveStudyNotes } from "@main/data/studyNotes";

export interface StudyNotesProps {}

export interface StudyNotesState {
  txt: string;
}

class StudyNotes extends React.Component<StudyNotesProps, StudyNotesState> {
  constructor(props: StudyNotesProps) {
    super(props);
    this.state = { txt: "" };
    this.loadStudyNotes();
  }

  updateNotes = (event) => {
    this.setState({ txt: event.target.value });
  };

  loadStudyNotes = async () => {
    let studyNotes = await getStudyNotes();
    this.setState({ txt: studyNotes.txt || "" });
    console.log("We got study notes: ", studyNotes);
  };

  saveStudyNotes = async () => {
    let newStudyNotes = { txt: this.state.txt };
    console.log("Saving study notes: ", newStudyNotes);
    let studyNotes = await saveStudyNotes(newStudyNotes);
  };

  render() {
    return (
      <Stack horizontalAlign="center">
        <Stack.Item>
          <Card tokens={{ padding: 15 }}>
            <Card.Section>
              <Text variant="xLarge">Study Notes</Text>
              <TextField
                multiline
                autoAdjustHeight
                value={this.state.txt}
                onChange={this.updateNotes}
              />
            </Card.Section>
            <Card.Section>
              <DefaultButton text="Load" onClick={this.loadStudyNotes} />
              <PrimaryButton text="Save" onClick={this.saveStudyNotes} />
            </Card.Section>
          </Card>
        </Stack.Item>
      </Stack>
    );
  }
}

export default StudyNotes;
