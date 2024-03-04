import { render, screen } from "../../../test-utils/testing-library-utils";
import { userEventSetup } from "../../../utils";
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { OrderConfirmation } from "../OrderConfirmation";

test("when post request fails alert banner has to displayed", async () => {
  server.resetHandlers(
    http.post("http://localhost:3030/order", () => {
      return new HttpResponse(null, {
        status: 500,
      });
    })
  );
  const { user, container } = render(<OrderConfirmation />);
  const alerts = await screen.findByText(/an error ocurred/i);
  expect(alerts).toBeInTheDocument();
});
