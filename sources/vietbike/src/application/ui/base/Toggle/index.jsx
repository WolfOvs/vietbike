import React from "react";

import { AmaToggle } from "./styles.js";

const Toggle = ({ toggleTitle, toggleChange, toggleValue, type }) => {
  return (
    <AmaToggle>
      {{ toggleTitle } && <div className="toggle-title">{toggleTitle}</div>}
      <div className="toggle-container">
        <input checked={toggleValue} type="checkbox" className="toggle-checkbox" onChange={e => toggleChange(toggleTitle, type, toggleValue)}/>
        <div className="toggle-knob" />
        <div className="toggle-layer" />
      </div>
    </AmaToggle>
  );
};

export default Toggle;
