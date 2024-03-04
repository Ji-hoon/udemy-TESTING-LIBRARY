import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";
import TotalUpdates from "./TotalUpdates";
import Button from "react-bootstrap/Button";

// eslint-disable-next-line react/prop-types
export default function OrderEntry({ submitOrder }) {
  const { totals } = useOrderDetails();

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops"></Options>
      <Options optionType="toppings"></Options>
      <TotalUpdates />
      <Button onClick={submitOrder} disabled={totals.scoops <= 0}>
        Create order
      </Button>
    </div>
  );
}
