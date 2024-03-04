import Container from "react-bootstrap/Container";
import { OrderDetailProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import { useState } from "react";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("entry"); // "entry" > "summary" > "confirm"

  function submitOrder() {
    setOrderPhase("summary");
  }

  function confirmOrder() {
    setOrderPhase("confirm");
  }

  function newOrder() {
    setOrderPhase("entry");
  }
  return (
    <Container>
      <OrderDetailProvider>
        {orderPhase === "entry" && <OrderEntry submitOrder={submitOrder} />}
        {orderPhase === "summary" && (
          <OrderSummary confirmOrder={confirmOrder} />
        )}
        {orderPhase === "confirm" && <OrderConfirmation newOrder={newOrder} />}
      </OrderDetailProvider>
    </Container>
  );
}

export default App;
