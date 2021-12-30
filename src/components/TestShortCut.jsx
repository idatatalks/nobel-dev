import React, { useState } from "react";

export default function HelloWorld() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button onClick={(c) => c + 1}>Count - {count}</Button>
    </div>
  );
}
