import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import {
  render,
  screen,
  logRoles,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { userEventSetup } from "../../../utils";

test("handle error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, {
        status: 500,
      });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, {
        status: 500,
      });
    })
  );
  const { container } = render(<OrderEntry />);
  const alerts = await screen.findAllByText(/an error ocurred/i);
  // or, findAllByRole("alert"); name value not provided.
  //   logRoles(container);

  expect(alerts).toHaveLength(2);
});

test("total has to be not updated when negative scoop count typed", async () => {
  const { user, container } = userEventSetup(<OrderEntry />);

  const subTotalCounts = await screen.findByText("Scoops total:", {
    exact: false,
  });
  logRoles(container);
  expect(subTotalCounts).toHaveTextContent("0.00");

  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  expect(vanillaScoop).toHaveClass("is-invalid");

  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "10");
  await user.type(vanillaScoop, "11");
  expect(subTotalCounts).toHaveTextContent("0.00");
  expect(vanillaScoop).toHaveClass("is-invalid");
});
