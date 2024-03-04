import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import TotalUpdates from "../entry/TotalUpdates";

// eslint-disable-next-line react/prop-types
export default function OrderSummary({ confirmOrder }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Object.keys(optionCounts.toppings);
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {totals.toppings !== 0 && (
        <>
          <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingList}</ul>
        </>
      )}
      <TotalUpdates />
      <SummaryForm confirmOrder={confirmOrder} />
    </div>
  );
}
