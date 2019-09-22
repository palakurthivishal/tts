import React, { useState, useEffect } from "react";

// styles
const tableHeaderStyle = {
  width: "200px",
  color: "#000",
  fontWeight: 900,
  fontSize: "15px",
  padding: "1px",
  opacity: "1",
  height: "30px",
  borderBottom: "none",
  paddingLeft: "5px"
};

//selectionType = 'radio' | 'checkbox', 'none',
export default ({ headers, multiSelect, onSelectAll, onColumnSort }) => {
  const [sortedColumn, setSortedColumn] = useState(null);

  // sorting order 0 = ascending, 1 = descending, easy to condition with boolean values
  const [sortingOrder, setSortingOrder] = useState(0);

  const [isSelectionMade, setIsSelectionMade] = useState("");

  const onSelectionChange = e => {
    const { checked } = e.target;
    setIsSelectionMade(checked);
    onSelectAll(checked);
  };

  return (
    <thead>
      <tr>
        <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
          {multiSelect ? (
            <input
              onChange={onSelectionChange}
              type={"checkbox"}
              checked={isSelectionMade}
            />
          ) : (
            ""
          )}
        </th>

        {headers.map((cell, i) => {
          return (
            <>
              <th
                key={i}
                style={tableHeaderStyle}
                onClick={() => cell.sortable && setSortedColumn(cell.name)}
              >
                {cell && cell.label}
                {/* have an icon */}
                {cell.sortable && <small>sort</small>}
              </th>
            </>
          );
        })}
      </tr>
      <tr style={{ height: "8px" }} />
    </thead>
  );
};
