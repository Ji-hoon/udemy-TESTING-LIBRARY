import { screen, logRoles } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import { userEventSetup } from "../../../utils";
import TotalUpdates from "../TotalUpdates";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoop change", async () => {
  const { user } = userEventSetup(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when topping options change", async () => {
  const { user, container } = userEventSetup(<Options optionType="toppings" />);
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  logRoles(container);

  const cherriesTopping = await screen.findByRole("checkbox", {
    name: /add cherries/i,
  });
  await user.click(cherriesTopping);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  const mnmsTopping = await screen.findByRole("checkbox", {
    name: /add m&ms/i,
  });
  await user.click(mnmsTopping);
  expect(toppingSubtotal).toHaveTextContent("3.00");

  await user.click(mnmsTopping);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", async () => {
    const { unmount } = userEventSetup(<TotalUpdates />);
    const grandTotalValue = screen.getByRole("heading", {
      name: /grand total : \$/i,
    });
    expect(grandTotalValue).toHaveTextContent("0.00");
    unmount();
  });
  test("grand total updates properly if scoops is added first", async () => {
    const { user } = userEventSetup(<OrderEntry />);
    const grandTotalValue = screen.getByRole("heading", {
      name: /grand total : \$/i,
    });

    const cherriesTopping = await screen.findByRole("checkbox", {
      name: /add cherries/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(grandTotalValue).toHaveTextContent("4.00");

    await user.click(cherriesTopping);
    expect(grandTotalValue).toHaveTextContent("5.50");
  });
  test("grand total updates properly if toppings is added first", async () => {
    const { user } = userEventSetup(<OrderEntry />);
    const grandTotalValue = screen.getByRole("heading", {
      name: /grand total : \$/i,
    });

    const cherriesTopping = await screen.findByRole("checkbox", {
      name: /add cherries/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.click(cherriesTopping);
    expect(grandTotalValue).toHaveTextContent("1.50");

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "0");
    expect(grandTotalValue).toHaveTextContent("1.50");

    await user.type(chocolateInput, "2");
    expect(grandTotalValue).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    const { user } = userEventSetup(<OrderEntry />);
    const grandTotalValue = screen.getByRole("heading", {
      name: /grand total : \$/i,
    });

    const cherriesTopping = await screen.findByRole("checkbox", {
      name: /add cherries/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.click(cherriesTopping);
    expect(grandTotalValue).toHaveTextContent("1.50");

    await user.type(chocolateInput, "1");
    expect(grandTotalValue).toHaveTextContent("3.50");

    await user.click(cherriesTopping);
    expect(grandTotalValue).toHaveTextContent("2.00");

    await user.clear(chocolateInput);
    expect(grandTotalValue).toHaveTextContent("0.00");
  });
});
