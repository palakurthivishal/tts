import React, { useState } from "react";
import styled from "styled-components";

const OptionList = styled.div`
  position: relative;
  display: inline-block;
  .icon {
    text-align: center;
    display: inline-block;
    color: blue;
    height: 24px;
    width: 24px;
    border: 1px solid blue;
    border-radius: 50%;
    margin-left: 4px;
  }
  ul {
    width: 150px;
    list-style-type: none;
    position: absolute;
    border: 1px solid #ccc;
    color: blue;
    padding: 8px;
    li {
      cursor: pointer;
    }
  }
`;

export default ({ config, onOptionSelect }) => {
  const [showOptionList, setShowOptionList] = useState(false);

  return (
    <OptionList
      onMouseEnter={() => setShowOptionList(true)}
      onMouseLeave={() => setShowOptionList(false)}
    >
      <span className="icon">+</span>
      {showOptionList && (
        <ul>
          {config.map((d, i) => (
            <li key={i} onClick={() => onOptionSelect(d)}>
              {d.label}
            </li>
          ))}
        </ul>
      )}
    </OptionList>
  );
};
