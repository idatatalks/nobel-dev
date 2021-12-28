import React, { Component } from "react";

export class Me extends Component {
  constructor(props) {
    super(props);
    console.log("Render Me,", props);
    // console.log("Me ref:", ref);
    console.log("Me:", this);
    // console.log(this.refs === ref);
  }

  render() {
    return (
      <div>
        <input type="text" />
        <button onClick={this.props.onClick}>Focus</button>
        {this.props.children}
      </div>
    );
  }
}

export default Me;
