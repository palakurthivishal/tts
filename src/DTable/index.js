import React, { useState, useEffect, useRef } from "react";
import { Table } from "reactstrap";
import styled from "styled-components";
import HeaderRow from "./HeaderRow";
import DataRow from "./DataRow";

const ScrollableTable = styled.div`
  max-height: 300px;
  overflow: auto;
  /* // remove if not required */
  border: 1px solid #f00;
  margin: 8px 0;
`;

export default ({
  headers = [],
  records,
  showNewRecord,
  newRecord,
  onRowSelectionChange,
  multiSelect,
  onVscrollEnd
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showUpadatingText, setShowUpdatingText] = useState(false);
  const lastScrollHt = useRef(0);
  // clear selection
  useEffect(() => {
    setSelectedRows([]);
    setShowUpdatingText(false);
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
    const { scrollHeight, scrollTop, offsetHeight } = e.currentTarget;
    // need to throttle this trigger
    console.log(lastScrollHt.current , scrollHeight, scrollTop + offsetHeight);
    if (
      scrollHeight <= scrollTop + offsetHeight
    ) {
      console.log("end");
      setShowUpdatingText(true);
      onVscrollEnd();
    }
  };

  return (
    <ScrollableTable onWheel={onTableScroll}>
      <Table responsive>
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

      <div style={{ marginTop: "100px",minHeight:'8px', textAlign: "center" }}>
          {showUpadatingText ? 'Updating records...' : ''}
        </div>
      
    </ScrollableTable>
  );
};
