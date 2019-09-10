import React from "react";

const getFormField = (field, onFieldChange) => {
  // simple switch handler to render form fields based on type

  switch (field.type) {
    case "text":
      return <input type="text" name={field.name} onChange={onFieldChange} />;
    case "select":
      return (
        <select name={field.name} onChange={onFieldChange}>
          {field.data.map(d => (
            <option value={d.value}>{d.label}</option>
          ))}
        </select>
      );
    default:
  }
};

export default ({ item, onFieldChange }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div>
        <label>{item.label}</label>
      </div>
      {item.fields &&
        item.fields.map(field => {
          return (
            <span style={{ margin: "0 4px" }}>
              {getFormField(field, onFieldChange)}
            </span>
          );
        })}
    </div>
  );
};
