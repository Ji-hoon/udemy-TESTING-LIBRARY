import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useOrderDetails } from "../../contexts/OrderDetails";

// eslint-disable-next-line react/prop-types
export default function SummaryForm({ confirmOrder }) {
  const [tcChecked, setTcChecked] = useState(false);
  const { optionCounts, resetOrder } = useOrderDetails();

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  function handleSubmit(e) {
    e.preventDefault();
    confirmOrder();
    resetOrder();

    console.log(optionCounts);
  }

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={(e) => handleSubmit(e)}
        type="submit"
        disabled={!tcChecked}
      >
        Confirm order
      </Button>
    </Form>
  );
}
