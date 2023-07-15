import React, { useContext, useEffect } from "react";
import { Space, Select } from "antd";
import MainContext from "../../contexts/MainContext";

const SelectComponent = () => {
  const { filterValue, setFilterValue } = useContext(MainContext);

  const handleChange = (value) => {
    setFilterValue(value);
  };

  useEffect(() => {}, []);

  return (
    <Space wrap>
      <Select
        defaultValue={
          filterValue
            ? filterValue.charAt(0).toUpperCase() + filterValue.slice(1)
            : "Filter by Region"
        }
        style={{
          width: "200px",
        }}
        onChange={handleChange}
        options={[
          {
            value: "",
            label: "All",
          },
          {
            value: "africa",
            label: "Africa",
          },
          {
            value: "americas",
            label: "America",
          },
          {
            value: "asia",
            label: "Asia",
          },
          {
            value: "europe",
            label: "Europe",
          },
          {
            value: "oceania",
            label: "Oceania",
          },
        ]}
      />
    </Space>
  );
};

export default SelectComponent;
