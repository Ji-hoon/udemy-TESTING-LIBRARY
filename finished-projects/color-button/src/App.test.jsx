import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
// import { kebabCaseToTitleCase } from "./helpers";

test("[1st Quiz] is checkbox works?", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  fireEvent.click(checkboxElement);

  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveStyle({ "background-color": "rgb(128,128,128)" });
  expect(checkboxElement).toBeChecked();

  fireEvent.click(checkboxElement);

  expect(buttonElement).toBeEnabled();

  expect(checkboxElement).not.toBeChecked();
});

test("[2nd Quiz] is button color changes in right order?", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  expect(buttonElement).toHaveClass("medium-violet-red");
  expect(checkboxElement).not.toBeChecked();
  fireEvent.click(buttonElement);

  expect(buttonElement).toHaveClass("midnight-blue");
  expect(checkboxElement).not.toBeChecked();
  fireEvent.click(buttonElement);

  expect(buttonElement).toHaveClass("medium-violet-red");
  expect(checkboxElement).not.toBeChecked();
});

// test("button click flow", () => {
//   render(<App />);

//   // find an element with a role of button and text matching /blue/i
//   const buttonElement = screen.getByRole("button", {
//     name: /blue/i,
//   });

//   // expect the class to be red
//   expect(buttonElement).toHaveClass("medium-violet-red");

//   // click button
//   fireEvent.click(buttonElement);

//   // expect the class to be blue
//   expect(buttonElement).toHaveClass("midnight-blue");

//   // expect the button text to match /red/i
//   expect(buttonElement).toHaveTextContent(/red/i);
// });

// test("checkbox flow", () => {
//   // render app
//   render(<App />);

//   // find elements
//   const buttonElement = screen.getByRole("button", {
//     name: /blue/i,
//   });
//   const checkboxElement = screen.getByRole("checkbox", {
//     name: /disable button/i,
//   });

//   // check initial conditions
//   expect(buttonElement).toBeEnabled();
//   expect(checkboxElement).not.toBeChecked();

//   // click checkbox to disable button
//   fireEvent.click(checkboxElement);
//   expect(buttonElement).toBeDisabled();
//   expect(buttonElement).toHaveClass("gray");

//   // click checkbox to re-enable button
//   fireEvent.click(checkboxElement);
//   expect(buttonElement).toBeEnabled();
//   expect(buttonElement).toHaveClass("medium-violet-red");
// });

// test("checkbox flow after button click", () => {
//   // render app
//   render(<App />);

//   // find elements
//   const buttonElement = screen.getByRole("button", {
//     name: /blue/i,
//   });
//   const checkboxElement = screen.getByRole("checkbox", {
//     name: /disable button/i,
//   });

//   // click button to change to blue
//   fireEvent.click(buttonElement);

//   // click checkbox to disable button
//   fireEvent.click(checkboxElement);
//   expect(buttonElement).toBeDisabled();
//   expect(buttonElement).toHaveClass("gray");

//   // click checkbox to re-enable button
//   fireEvent.click(checkboxElement);
//   expect(buttonElement).toBeEnabled();
//   expect(buttonElement).toHaveClass("midnight-blue");
// });

// describe("kebabCaseToTitleCase", () => {
//   test("Works for no hypens", () => {
//     expect(kebabCaseToTitleCase("red")).toBe("Red");
//   });
//   test("Works for one hyphen", () => {
//     expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
//   });
//   test("Works for multiple inner hyphens", () => {
//     expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
//   });
// });
