import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
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

const Details = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchCountryByName() {
      await axios
        .get(`https://restcountries.com/v3.1/name/${id}`)
        .then((res) => setCountry(res.data[0]))
        .then(() => {
          setIsLoading(false);
        });
    }
    fetchCountryByName();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${isLoading ? "" : country.name.common} Details`}</title>
      </Helmet>
      <div className={styles.app_details_body}>
        <div className={`${styles.app_details_body_container} container`}>
          <Link to="/" className={styles.app_details_body_back_btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z"
                fill="#111517"
              />
            </svg>
            <span>Back</span>
          </Link>
          {isLoading ? (
            <div className={styles.app_details_body_detail}>
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <div className={styles.app_details_body_detail}>
              <img src={country.flags.png} alt="" />
              <div className={styles.app_details_body_detail_right}>
                <p className={styles.app_details_body_detail_right_title}>
                  {country.name.common}
                </p>
                <div className={styles.app_details_body_detail_right_info}>
                  <ul
                    className={styles.app_details_body_detail_right_info_list}
                  >
                    <li
                      className={
                        styles.app_details_body_detail_right_info_list_item
                      }
                    >
                      <b>Native Name:</b>
                      {country.name.common}
                    </li>
                    <li
                      className={
                        styles.app_details_body_detail_right_info_list_item
                      }
                    >
                      <b>Population:</b>
                      {country.population}
                    </li>
                    <li
                      className={
                        styles.app_details_body_detail_right_info_list_item
                      }
                    >
                      <b>Region:</b>
                      {country.region}
                    </li>
                    <li
                      className={
                        styles.app_details_body_detail_right_info_list_item
                      }
                    >
                      <b>Sub Region:</b>
                      {country.subregion}
                    </li>
                    <li
                      className={
                        styles.app_details_body_detail_right_info_list_item
                      }
                    >
                      <b>Capital:</b>
                      {country.capital[0]}
                    </li>
                  </ul>
                  <ul
                    className={styles.app_details_body_detail_right_info_list}
                  >
                    <li
                      className={
                        styles.app_details_body_detail_right_info_list_item
                      }
                    >
                      <b>Top Level Domain:</b>
                      {country.tld[0]}
                    </li>
                    <li
                      className={
                        styles.app_details_body_detail_right_info_list_item
                      }
                    >
                      <b>Currencies:</b>{" "}
                      {Object.entries(country.currencies).map(
                        (currency, index, array) => {
                          return `${currency[1].name}${
                            index === array.length - 1 ? "." : ", "
                          } `;
                        }
                      )}
                    </li>
                    <li
                      className={
                        styles.app_details_body_detail_right_info_list_item
                      }
                    >
                      <b>Languages:</b>
                      {Object.entries(country.languages).map(
                        (language, index, array) => {
                          return `${language[1]}${
                            index === array.length - 1 ? "." : ", "
                          }`;
                        }
                      )}
                    </li>
                  </ul>
                </div>
                <div className={styles.app_details_body_detail_right_footer}>
                  <span
                    className={
                      styles.app_details_body_detail_right_footer_title
                    }
                  >
                    Border Countries:
                    <span>
                      {typeof country.borders != "undefined" ? (
                        country.borders.map((border, index) => {
                          return (
                            <Tag className={styles.tag} key={index}>
                              {border}
                            </Tag>
                          );
                        })
                      ) : (
                        <span className={styles.no_borders}>
                          No border countries
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
