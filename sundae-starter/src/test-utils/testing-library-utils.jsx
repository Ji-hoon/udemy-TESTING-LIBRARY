import { render } from "@testing-library/react";
import { OrderDetailProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) => {
  return render(ui, { wrapper: OrderDetailProvider, ...options });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { renderWithContext as render };
