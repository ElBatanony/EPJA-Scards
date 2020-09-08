import React from "react";
import { getScards } from "@main/__data__/actions/main";

var scards = [];

const sum = (a, b) => a + b;
export { sum };

const displayScards = async () => {
  scards = await getScards();
  console.log("We got scards!");
};

export default () => {
  displayScards();
  return (
    <div>
      <h1>Hello, world!</h1>
      <div id="scards">
        {scards.length == 0 ? "No Scards" : "We got Scards!"}
      </div>
    </div>
  );
};
