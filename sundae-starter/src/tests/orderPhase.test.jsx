import { screen } from "@testing-library/react";
import { userEventSetup } from "../utils";
import App from "../App";
import { logRoles } from "../test-utils/testing-library-utils";
import OrderEntry from "../pages/entry/OrderEntry";

test("order phases for happy path", async () => {
  const { user, container } = userEventSetup(<App />);
  const grandtotal = screen.getByRole("heading", {
    name: /grand total : \$/i,
  });
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });

  await user.type(vanillaScoop, "1");
  expect(grandtotal).toHaveTextContent("2.00");

  //find and click order button
  const orderButtonElement = screen.getByRole("button", {
    name: /create order/i,
  });
  await user.click(orderButtonElement);

  // check summary information based on order
  const orderSummaryTitle = await screen.findByRole("heading", {
    name: /order summary/i,
  });
  expect(orderSummaryTitle).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const orderCheckboxElement = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButtonElement = await screen.findByRole("button", {
    name: /confirm order/i,
  });

  await user.click(orderCheckboxElement);
  expect(confirmButtonElement).not.toBeDisabled();
  await user.click(confirmButtonElement);

  // confirm loading text appears
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const thankyouHeading = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankyouHeading).toBeInTheDocument();

  // confirm order number on confirmation
  const orderNumber = await screen.findByText("Your order number is ", {
    exact: false,
  });
  logRoles(container);

  screen.debug();
  expect(orderNumber).toHaveTextContent("001");

  // click new order button on comfirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  //check that scoops and toppings sub totals have been reset
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");
});

test("topping summary section will not be displayed when doesn't exist selected topping", async () => {
  const { user, container } = userEventSetup(<App />);
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.type(vanillaScoop, "1");

  const orderButtonElement = screen.getByRole("button", {
    name: /create order/i,
  });
  await user.click(orderButtonElement);

  // use queryBy when expect element not exists
  const orderSummaryToppingsTitle = screen.queryByText("Toppings:");
  expect(orderSummaryToppingsTitle).not.toBeInTheDocument();
});

test("disable create order button when no scoop order", async () => {
  const { user, container } = userEventSetup(<OrderEntry />);

  //find and click order button
  const orderButtonElement = screen.getByRole("button", {
    name: /create order/i,
  });
  expect(orderButtonElement).toBeDisabled();

  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  //   await user.type(vanillaScoop, "0");
  await user.type(vanillaScoop, "1");
  expect(orderButtonElement).not.toBeDisabled();

  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "0");
  expect(orderButtonElement).toBeDisabled();
});
