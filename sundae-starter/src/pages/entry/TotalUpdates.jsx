import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";

export default function TotalUpdates() {
  const { totals } = useOrderDetails();

  return (
    <h2>Grand total : {formatCurrency(totals.scoops + totals.toppings)}</h2>
  );
}
