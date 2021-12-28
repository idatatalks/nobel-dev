import React from "react";
import { Me } from "./Me";
import { Child } from "./Child";
import { ForwardMe } from "./ForwardMe";

export const Father = (props) => {
  console.log("Render Father - props:", props);
  const ref = React.createRef();
  ref.current = "hello";
  console.log("Father ref:", ref);
  const ref2 = React.createRef();
  ref2.current = "hello2";
  console.log("Father ref2:", ref2);
  const handleClick = (event) => {
    console.log("event:", event);
    ref.current.focus();
  };
  return (
    <div>
      <ForwardMe ref={ref}></ForwardMe>
      <button onClick={handleClick}>Change focus</button>
      {/* Father
      <Me ref={ref} onClick={handleClick}>
        <Child ref={null} name="world" />
      </Me> */}
    </div>
  );
};
