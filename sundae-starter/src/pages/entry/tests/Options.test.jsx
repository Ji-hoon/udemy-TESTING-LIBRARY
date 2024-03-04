import { render, screen } from "../../../test-utils/testing-library-utils";
import { userEventSetup } from "../../../utils";

import Options from "../Options";
import ScoopOptions from "../ScoopOption";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images ($를 끝에 붙일 경우 마지막에 있다라는 의미)
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("[Quiz] topping test", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((image) => image.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudges topping",
  ]);
});

test("spinbutton has class is-invalid when type negative number", async () => {
  const { user, container } = userEventSetup(<Options optionType="scoops" />);
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  const subTotalCounts = await screen.findByText("Scoops total:", {
    exact: false,
  });
  screen.debug();

  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "10");
  await user.type(vanillaScoop, "11");
  expect(vanillaScoop).toHaveClass("is-invalid");
  expect(subTotalCounts).toHaveTextContent("0.00");

  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "0");
  expect(subTotalCounts).toHaveTextContent("0.00");

  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "-3");
  expect(subTotalCounts).toHaveTextContent("0.00");
});
