import React, { useState, useEffect } from "react";
import SearchOptionList from "./SearchOptionList";
import RenderSearchItem from "./RenderSearchItem";

// to be passsed as props to this component
const config = [
  {
    index: 0, // index for easy retrieval
    label: "Location Number", // display purpose
    fields: [
      // form fields to be rendered for this criteria
      {
        type: "select", // defines which form field tag it should be
        name: "locationNumberFrom", // name of field
        placeholder: "From", // simple placeholder
        data: [
          // applicable as required
          {
            label: "Location Number 1",
            value: "Value1"
          },
          {
            label: "Location Number 2",
            value: "Value2"
          }
        ]
      },
      {
        type: "select",
        name: "locationNumberTo",
        placeholder: "To",
        data: [
          {
            label: "Location Number 3",
            value: "Value3"
          },
          {
            label: "Location Number 4",
            value: "Value4"
          }
        ]
      }
    ]
  },
  {
    index: 1,
    label: "Location type",
    fields: [
      {
        type: "text",
        name: "locationType",
        placeholder: "location type"
      }
    ]
  },
  {
    index: 2,
    label: "Other criteria",
    fields: [
      {
        type: "select",
        name: "dummyCriteria",
        placeholder: "dummy",
        data: [
          {
            label: "test",
            value: "test"
          }
        ]
      }
    ]
  }
];

export default () => {
  // add first item to search by default
  const [searchItems, setSearchItems] = useState([config[0]]);

  const addSearchCriteria = selectedItem => {
    const indexInSearchCriteria = searchItems.findIndex(
      d => d.index === selectedItem.index
    );
    if (indexInSearchCriteria === -1) {
      setSearchItems([...searchItems, selectedItem]);
    }
  };

  const handleChange = event => {
    // place where we listen to all the search criteria form values
    // maintain a state variable to build the form data status
    console.log(event.target.name, event.target.value);
  };

  return (
    <>
      <h2>Search Criteria</h2>
      {searchItems.map(item => (
        <RenderSearchItem item={item} onFieldChange={handleChange} />
      ))}
      <SearchOptionList config={config} onOptionSelect={addSearchCriteria} />
    </>
  );
};
