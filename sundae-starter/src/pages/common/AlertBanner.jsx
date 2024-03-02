import Alert from "react-bootstrap/Alert";

// eslint-disable-next-line react/prop-types
export default function AlertBanner({ message, variant }) {
  const alertMessage = message || "An error ocurred. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundolor: "red" }}>
      {alertMessage}
    </Alert>
  );
}
