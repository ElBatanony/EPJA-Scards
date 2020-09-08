import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export interface ScardProps {
  scard: {
    id: number;
    q: string;
    a: string;
  };
}

export interface ScardState {}

class Scard extends React.Component<ScardProps, ScardState> {
  constructor(props: ScardProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box my={2}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Q: {this.props.scard.q}
            </Typography>
            <Typography variant="body2" component="p">
              {this.props.scard.a}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default Scard;
