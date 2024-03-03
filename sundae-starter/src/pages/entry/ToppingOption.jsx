import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../contexts/OrderDetails";

// eslint-disable-next-line react/prop-types
export default function ToppingOption({ name, imagePath }) {
  // const [toppingChecked, setToppingChecked] = useState(false);
  const { updateItemCount } = useOrderDetails();

  function handleChange(e) {
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
    // setToppingChecked(!toppingChecked);
  }
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <br />
      <input
        type="checkbox"
        id={`${name}-topping-checkbox`}
        defaultChecked={false}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={`${name}-topping-checkbox`}>Add {name}</label>
    </Col>
  );
}
