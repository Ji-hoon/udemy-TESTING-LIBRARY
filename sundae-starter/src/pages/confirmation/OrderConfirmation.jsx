import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import AlertBanner from "../common/AlertBanner";

// eslint-disable-next-line react/prop-types
export function OrderConfirmation({ newOrder }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        // TODO: handle error response
        //console.log(error);
        setError(true);
      });
  }, []);

  const createOrderButton = (
    <Button variant="primary" onClick={newOrder} type="submit">
      Create new order
    </Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner />
        {createOrderButton}
      </>
    );
  }

  return (
    <>
      {orderNumber === null ? (
        <>loading...</>
      ) : (
        <>
          <>
            <h2>Thank you!</h2>
            <p>Your order number is {orderNumber}</p>
          </>
          {createOrderButton}
        </>
      )}
    </>
  );
}
