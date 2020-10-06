import React from "react";
import { Ajouter } from "./Ajouter";

export class Ajouter extends React.Component {
  constructor(props) {
    super(props)
  } 
  render() {
    return (
      <>
        <Ajouter history={this.props.history} />
      </>
    );
  }
}



