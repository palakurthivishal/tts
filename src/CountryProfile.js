import React, { useState, useEffect } from "react";

import DTable from "./DTable";

const NewRecord = ({ onSave, onCancel }) => {
  const [newRecord, setNewRecord] = useState({});
  const handleChange = e => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };
  return (
    <tr>
      <td>
        <select
          name="countryCode"
          onChange={handleChange}
          value={newRecord.countryCode}
        >
          <option>CountryCode1</option>
          <option>CountryCode2</option>
        </select>
      </td>
      <td>
        <select
          name="country"
          onChange={handleChange}
          value={newRecord.country}
        >
          <option>Country1</option>
          <option>Country2</option>
        </select>
      </td>
      <td>
        <input
          value={newRecord.nationalCode}
          onChange={handleChange}
          type="text"
          name="nationalCode"
          placeholder="nationalCode"
        />
      </td>
      <td>
        <input
          value={newRecord.nationalType}
          onChange={handleChange}
          type="text"
          name="nationalType"
          placeholder="nationalType"
        />
      </td>

      <td>
        <button onClick={() => onSave(newRecord)}>Save</button>
        <button onClick={() => onCancel()}>Cancel</button>
      </td>
    </tr>
  );
};

export default props => {
  const { productId } = props;
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setRecords(getRecordsFromServer());
  }, []);

  const saveRecord = newRecord => {
    // call /save api
    // on suceess of api call do,
    setRecords([...records, newRecord]);
    setShowNewRecord(false);
  };

  const deleteSelectedRecords = () => {
    // call /delete api
    // on success, do
    console.log(selectedRows);
    setRecords(getRecordsFromServer());
    setSelectedRows([]);
    setShowNewRecord(false);
  };

  const getRecordsFromServer = () => {
    // fetch data from server
    return [
      {
        id: 1,
        countryCode: "countryCode1",
        country: "country1",
        nationalCode: "nationalCode1",
        nationalType: "nationalType1"
      },
      {
        id: 2,
        countryCode: "countryCode2",
        country: "country2",
        nationalCode: "nationalCode2",
        nationalType: "nationalType2"
      },
      {
        id: 11,
        countryCode: "countryCode1",
        country: "country1",
        nationalCode: "nationalCode1",
        nationalType: "nationalType1"
      },
      {
        id: 22,
        countryCode: "countryCode2",
        country: "country2",
        nationalCode: "nationalCode2",
        nationalType: "nationalType2"
      },
      {
        id: 111,
        countryCode: "countryCode1",
        country: "country1",
        nationalCode: "nationalCode1",
        nationalType: "nationalType1"
      },
      {
        id: 222,
        countryCode: "countryCode2",
        country: "country2",
        nationalCode: "nationalCode2",
        nationalType: "nationalType2"
      }
    ];
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowNewRecord(true);
          setSelectedRows([]);
        }}
      >
        Add
      </button>
      <button className="btn btn-primary" onClick={deleteSelectedRecords}>
        Delete
      </button>
      <DTable
        records={records}
        headers={[
          {
            name: "id",
            label: "ID",
            sortable: false
          },
          {
            name: "countryCode",
            label: "Country Code",
            sortable: true
          },
          {
            name: "country",
            label: "Country",
            sortable: true
          },
          {
            name: "nationalCode",
            label: "National Code",
            sortable: false
          },
          {
            name: "nationalType",
            label: "National Type",
            sortable: false
          }
        ]}
        onRowSelectionChange={selRows => {
          setSelectedRows(selRows);
        }}
        multiSelect={true}
        showNewRecord={showNewRecord}
        newRecord={
          <NewRecord
            onSave={saveRecord}
            onCancel={() => {
              setShowNewRecord(false);
            }}
          />
        }
      />

      <pre>Selected Rows:{JSON.stringify(selectedRows, 0, 2)}</pre>
    </>
  );
};
