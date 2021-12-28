import React from "react";

export const ForwardChild = React.forwardRef((props, ref) => {
  console.log("ForwardChild ref:", ref);
  return (
    <div>
      <p>ForwardChild</p>
      <input type="text" ref={ref} />
    </div>
  );
});
