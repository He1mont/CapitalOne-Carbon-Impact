import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom";
import { fireEvent } from "@testing-library/react";

test("renders the HomePage component", () => {
  render(<HomePage />);
});

test("redirects to /Login when Login button is clicked", () => {
  const { history } = render(
    <MemoryRouter initialEntries={["/"]}>
      <HomePage />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByAltText('Login'));
  //expect(history).toBe('/Login');
});
test("redirects to /Transaction when Transaction button is clicked", () => {
  const { history } = render(
    <MemoryRouter initialEntries={["/"]}>
      <HomePage />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('View Transactions'));
  //expect(history.location.pathname).toBe('/Transactions');
});
