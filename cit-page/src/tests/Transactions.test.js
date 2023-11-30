import React from "react";
import { render, screen } from "@testing-library/react";
import Transaction from "../pages/Transactions";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom";
import { fireEvent } from "@testing-library/react";

test("renders the Transaction component", () => {
  render(<Transactions />);
});