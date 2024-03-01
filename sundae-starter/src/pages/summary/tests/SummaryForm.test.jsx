import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm.jsx";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  };
}

// eslint-disable-next-line vitest/expect-expect
test("[Quiz3] check submit form", async () => {
  const { user } = setup(<SummaryForm />);

  const buttonElement = screen.getByRole("button", { name: /confirm order/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkboxElement).not.toBeChecked();

  // always return Promise
  await user.click(checkboxElement);
  expect(buttonElement).toBeEnabled();

  await user.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
});

test("popover responds to hover", async () => {
  const { user } = setup(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
