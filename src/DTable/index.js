import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

import DataRow from "./DataRow";

export default ({
  headers,
  records,
  showNewRecord,
  newRecord,
  onRowSelectionChange
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  // clear selection
  useEffect(() => {
    setSelectedRows([]);
  }, [records, showNewRecord]);

  // update parent about change of selection
  useEffect(() => {
    onRowSelectionChange && onRowSelectionChange(selectedRows);
  }, [selectedRows]);

  const onRowSelection = ({ id, isSelected }) => {
    if (isSelected) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(
        selectedRows.splice(
          selectedRows.findIndex(existingId => existingId === id),
          1
        )
      );
    }
  };
  return (
    <Table>
      <thead />
      <tbody>
        {/* // show data */}
        {records &&
          records.map((d, i) => (
            <DataRow
              key={i}
              row={d}
              onSelect={onRowSelection}
              rowSelected={selectedRows.includes(d.id)}
            />
          ))}
        {/* // empty record */}
        {showNewRecord && newRecord}
      </tbody>
    </Table>
  );
};
