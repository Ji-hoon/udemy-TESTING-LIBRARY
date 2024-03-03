import Options from "./Options";
import TotalUpdates from "./TotalUpdates";

export default function OrderEntry() {
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops"></Options>
      <Options optionType="toppings"></Options>
      <TotalUpdates />
    </div>
  );
}
