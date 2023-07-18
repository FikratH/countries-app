import React, { useContext, useEffect, useState } from "react";
import styles from "./Index.module.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import CountryCard from "../../components/CountryCard/CountryCard";
import axios from "axios";
import MainContext from "../../contexts/MainContext";
import isNullOrWhitespace from "../../utils/functions/isNullOrWhiteSpace";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Button } from "antd";
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
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [loadMoreActive, setLoadMoreActive] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=unMember,name,capital,population,flags,region"
      )
      .then((res) => {
        setData([...res.data.filter((country) => country.unMember === true)]);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setDisplayCount(8);
  }, [filterValue]);

  useEffect(() => {
    if (
      displayedData.slice(0, displayCount + 8).length == displayedData.length
    ) {
      setLoadMoreActive(false);
    } else {
      setLoadMoreActive(true);
    }
    if (!isNullOrWhitespace(search)) {
      setDisplayedData([
        ...data.filter(
          (country) =>
            country.unMember === true &&
            country.name.common.toLowerCase().includes(search.toLowerCase()) &&
            country.region.toLowerCase().includes(filterValue)
        ),
      ]);
    } else {
      setDisplayedData([
        ...data.filter(
          (country) =>
            country.unMember === true &&
            country.region.toLowerCase().includes(filterValue)
        ),
      ]);
    }
  }, [data, filterValue, search]);

  const enterLoading = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      // setDisplayedData([...data.slice(0, displayCount + 8)]);
      setDisplayCount((prev) => (prev += 8));
      setLoadMoreLoading(false);
      if (
        displayedData.slice(0, displayCount + 8).length == displayedData.length
      ) {
        setLoadMoreActive(false);
      }
    }, 800);
  };

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
              displayedData.slice(0, displayCount).map((country, index) => {
                // if (isNullOrWhitespace(search)) {
                //   if (country.region.toLowerCase().includes(filterValue)) {
                //     return (
                //       <CountryCard
                //         key={index}
                //         name={country.name.common}
                //         image={country.flags.png}
                //         population={country.population}
                //         region={country.region}
                //         capital={country.capital[0]}
                //       />
                //     );
                //   }
                // } else {
                //   if (
                //     country.name.common
                //       .toUpperCase()
                //       .includes(search.toUpperCase()) &&
                //     country.region.toLowerCase().includes(filterValue)
                //   ) {
                //     return (
                //       <CountryCard
                //         key={index}
                //         name={country.name.common}
                //         image={country.flags.png}
                //         population={country.population}
                //         region={country.region}
                //         capital={country.capital[0]}
                //       />
                //     );
                //   }
                // }
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
              })
            )}
          </div>
          {loadMoreActive ? (
            <Button
              type="primary"
              loading={loadMoreLoading}
              onClick={enterLoading}
            >
              Load More
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
