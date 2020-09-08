import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export interface AppbarProps {}

export interface AppbarState {}

class Appbar extends React.Component<AppbarProps, AppbarState> {
  state = {};
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Scards</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Appbar;
