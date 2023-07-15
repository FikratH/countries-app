import React, { useContext, useEffect, useState } from "react";
import styles from "./Index.module.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import { Space, Select, Card } from "antd";
import CountryCard from "../../components/CountryCard/CountryCard";
import axios from "axios";
import MainContext from "../../contexts/MainContext";
import isNullOrWhitespace from "../../utils/functions/isNullOrWhiteSpace";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Tag } from "antd";
import { Helmet } from "react-helmet";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { search, filterValue } = useContext(MainContext);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          "https://restcountries.com/v3.1/all?fields=unMember,name,capital,population,flags,region"
        )
        .then((res) => {
          setData([...res.data.filter((country) => country.unMember == true)]);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Countries</title>
      </Helmet>
      <div className={styles.app_index_body}>
        <div className={`${styles.app_index_body_container} container`}>
          <div className={styles.app_index_body_search_bar}>
            <SearchInput />
            <SelectComponent />
          </div>
          <div className={styles.app_index_body_cards}>
            {isLoading ? (
              <Spin indicator={antIcon} />
            ) : (
              data.map((country, index) => {
                if (isNullOrWhitespace(search)) {
                  if (country.region.toLowerCase().includes(filterValue)) {
                    return (
                      <CountryCard
                        key={index}
                        name={country.name.common}
                        image={country.flags.png}
                        population={country.population}
                        region={country.region}
                        capital={country.capital[0]}
                      />
                    );
                  }
                } else {
                  if (
                    country.name.common
                      .toUpperCase()
                      .includes(search.toUpperCase()) &&
                    country.region.toLowerCase().includes(filterValue)
                  ) {
                    return (
                      <CountryCard
                        key={index}
                        name={country.name.common}
                        image={country.flags.png}
                        population={country.population}
                        region={country.region}
                        capital={country.capital[0]}
                      />
                    );
                  }
                }
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
