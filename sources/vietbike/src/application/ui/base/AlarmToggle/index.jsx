import React from "react";

import { Switcher } from "./styles.js";

const AlarmSwitch = ({ toggleTitle, toggleChange, toggleValue }) => {
  return (
    <Switcher>
      {{ toggleTitle } && <div className="toggle-title">{toggleTitle}</div>}
      <div className="toggle-container">
        <input checked={toggleValue} type="checkbox" className="toggle-checkbox" onChange={() => toggleChange(!toggleValue)}/>
        <div className={toggleValue ? 'toggle-knob on' : 'toggle-knob off'}></div>
        <div className="toggle-layer" />
      </div>
    </Switcher>
  );
};

export default AlarmSwitch;
