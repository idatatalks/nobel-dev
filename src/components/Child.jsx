import React, { Component } from "react";

// export const Child = (props) => {
//   console.log("Render Child,", props);
//   return <div>child</div>;
// };

export class Child extends Component {
  render() {
    console.log("Render Child,", this);
    return <div>child</div>;
  }
}
