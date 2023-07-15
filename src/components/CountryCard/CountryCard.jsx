import React from "react";
import { Card, Button } from "antd";
import styles from "./CountryCard.module.css";
import { Link } from "react-router-dom";

const { Meta } = Card;
const CountryCard = ({ name, image, population, region, capital }) => {
  return (
    <Link to={`/details/${name}`} style={{ textDecoration: "none" }}>
      <Card
        hoverable
        className={styles.card}
        cover={<img alt="card-img" className={styles.image} src={image} />}
      >
        <div className={styles.card_text}>
          <Meta title={name} />
          <br></br>
          <div className={styles.card_description}>
            <p className={styles.card_description_title}>
              <b>Population:</b> {population}
            </p>
            <p className={styles.card_description_title}>
              <b>Region:</b> {region}
            </p>
            <p className={styles.card_description_title}>
              <b>Capital:</b> {capital}
            </p>
            <Link to={`/details/${name}`}>
              <Button type="primary" className={styles.card_description_btn}>
                Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CountryCard;
