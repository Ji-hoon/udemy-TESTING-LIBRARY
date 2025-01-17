/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utils";
import { useOrderDetails } from "../../contexts/OrderDetails";

// eslint-disable-next-line react/prop-types
export default function Options({ optionType }) {
  // optionType is "scopps" or "toppings"
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  // optionType is 'scoops' or 'toppings
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, {
        signal: controller.signal,
      })
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
        //console.log(error);
        setError(true);
      });

    // return () => {
    //   controller.abort();
    // };
  }, [optionType]);

  if (error) {
    // eslint-disable-next-line react/jsx-no-undef
    return <AlertBanner />;
  }

  // TODO: replace `null` with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
