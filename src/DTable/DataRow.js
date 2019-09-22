import React, { useState, useEffect } from "react";

export default ({ row, onSelect, selectionMode }) => {
  const selectedStyles = { background: "#F00" };

  
  return (
    <tr style={{ background: row.isSelected ? "#F00" : "" }}>
      {selectionMode && (
        <td>
          <input
            type={selectionMode}
            onChange={e => {
              onSelect({ isSelected: e.target.checked, id: row.id });
            }}
            checked={row.isSelected}
          />
        </td>
      )}
      {Object.entries(row).map((cell, i) => {
        
        return <td key={i}>{cell[1]}</td>;
      })}
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
};
