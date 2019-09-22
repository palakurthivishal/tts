import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import styled from "styled-components";
import HeaderRow from "./HeaderRow";
import DataRow from "./DataRow";

const ScrollableTable = styled.div`
  max-height: 300px;
  overflow: auto;
  border: 1px solid #ccc;
`;

export default ({
  headers = [],
  records,
  showNewRecord,
  newRecord,
  onRowSelectionChange,
  multiSelect
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
    if (multiSelect) {
      if (isSelected) {
        setSelectedRows([...selectedRows, id]);
      } else {
        let updatedSelection = [...selectedRows];
        updatedSelection.splice(
          updatedSelection.findIndex(existingId => existingId === id),
          1
        );
        setSelectedRows(updatedSelection);
      }
    } else {
      if (isSelected) setSelectedRows([id]);
    }
  };

  const onAllRowSelection = isChecked => {
    if (isChecked) {
      setSelectedRows(records.map(d => d.id));
    } else {
      setSelectedRows([]);
    }
  };

  const onTableScroll = e => {
    debugger;
  };

  return (
    <ScrollableTable onWheel={onTableScroll}>
      <Table>
        <HeaderRow
          headers={headers}
          multiSelect={multiSelect}
          onSelectAll={onAllRowSelection}
        />
        <tbody>
          {/* // show data */}
          {records &&
            records.map((d, i) => (
              <DataRow
                selectionMode={multiSelect ? "checkbox" : "radio"}
                key={i}
                row={{ ...d, isSelected: selectedRows.includes(d.id) }}
                onSelect={onRowSelection}
                multiSelect
              />
            ))}
          {/* // empty record */}
          {showNewRecord && newRecord}
        </tbody>
      </Table>
    </ScrollableTable>
  );
};
