import React from "react";
import { ForwardChild } from "./ForwardChild";

export const ForwardMe = React.forwardRef((props, ref) => {
  console.log("ForwardMe this:", this);
  console.log("ForwardMe ref:", ref);
  return (
    <div>
      <p>ForwardMe</p>
      {/* <input type="text" ref={ref} /> */}
      <ForwardChild ref={ref}></ForwardChild>
    </div>
  );
});
