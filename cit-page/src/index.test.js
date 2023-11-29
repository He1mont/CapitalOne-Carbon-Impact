import {render,screen} from "@testing-library/react"
import {suspense} from "react"
import React from 'react';
import App from './App';

test('renders the App component', () => {
  const { getByText } = render(<App />);
  const appElement = getByText(/Your App Content/i); // Update with your actual app content
  expect(appElement).toBeInTheDocument();
});

