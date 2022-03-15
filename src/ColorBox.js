import { useState } from "react";

export function ColorBox() {
  const [color, setcolor] = useState("white");
  const styles = { background: color };
  return (
    <div className="color_container">
      <input
        style={styles}
        onChange={(event) => {
          setcolor(event.target.value);
        }}
        placeholder="Enter a color"
      />
    </div>
  );
}
