import React from "react";
import { getScards } from "@main/__data__/actions/main";

import Scard from "@main/components/Scard";

interface ScardsProps {}

interface ScardsState {
  hello?: string;
  scards: Array<any>;
}

class Scards extends React.Component<ScardsProps, ScardsState> {
  state: ScardsState;

  constructor(props) {
    super(props);
    this.state = {
      hello: "No Scards",
      scards: [],
    };
    this.displayScards();
  }

  displayScards = async () => {
    let scardsRet = await getScards();
    this.setState({
      scards: scardsRet,
    });
    console.log("We got scards!");
  };

  render() {
    var scardsList = [];
    if (this.state.scards)
      scardsList = this.state.scards.map((scard) => (
        <Scard key={scard.id} scard={scard} />
      ));
    return (
      <div>
        {this.state.scards.length == 0 ? (
          <h2>Loading ...</h2>
        ) : (
          <div>{scardsList}</div>
        )}
      </div>
    );
  }
}

export default Scards;
