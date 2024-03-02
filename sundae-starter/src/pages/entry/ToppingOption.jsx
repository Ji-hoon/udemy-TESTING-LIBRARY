import Col from "react-bootstrap/Col";

// eslint-disable-next-line react/prop-types
export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}
