import React, { useState, useEffect } from "react";

export default ({ row, onSelect, rowSelected }) => {
  const [isSelected, setIsSelected] = useState(false);
  const selectedStyles = { background: "#F00" };

  useEffect(() => {
    setIsSelected(rowSelected);
  }, [rowSelected]);

  useEffect(() => {
    onSelect({ isSelected, id: row.id });
  }, [isSelected]);

  return (
    <tr
      style={{ background: isSelected ? "#F00" : "" }}
      onClick={() => setIsSelected(!isSelected)}
    >
      {Object.entries(row).map((cell, i) => {
        return <td key={i}>{cell}</td>;
      })}
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
};
