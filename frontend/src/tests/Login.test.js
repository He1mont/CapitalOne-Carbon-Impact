import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom";
import { fireEvent } from "@testing-library/react";

test("renders the Login page component", () => {
  render(<Login />);
});