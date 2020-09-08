import React from "react";
import Scards from "@main/components/Scards";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const sum = (a, b) => a + b;
export { sum };

export default () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" fontSize="h2.fontSize" my={2}>
        Welcome to Scards!
      </Box>
      <Scards></Scards>
    </Container>
  );
};
