import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(false);

  // 내가 쓴 함수
  function handleChange(e) {
    const targetValue = parseFloat(e.target.value);
    const isValueValid =
      0 <= targetValue && // 0이상
      10 >= targetValue && // 10이하
      Math.floor(targetValue) === targetValue && // 정수
      e.target.value !== ""; // 공백이 아님

    updateItemCount(
      name,
      isValueValid ? parseInt(e.target.value) : 0,
      "scoops"
    );

    setIsValid(isValueValid);

    // 테스트에서는 type 액션을 취하는데, -3을 입력할 경우 03 으로 입력되기 때문에 에러가 나는거였음.
    // if (e.target.value === "") {
    //   e.target.value = 0;
    //   return;
    // }
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            className={isValid ? "" : "is-invalid"}
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
