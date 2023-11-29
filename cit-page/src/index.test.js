import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';


jest.mock('react-dom', () => ({
  createRoot: jest.fn(),
  render: jest.fn(),
}));

jest.mock('./reportWebVitals', () => jest.fn());

const mockRoot = { render: jest.fn() };
jest.spyOn(ReactDOM, 'createRoot').mockImplementation(() => mockRoot);

test('renders the App component with StrictMode', () => {
  // Import the index.js file after the mocks have been set up
  require('./index');


  expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById('root'));

  // Check if the App component is rendered with StrictMode
  expect(mockRoot.render).toHaveBeenCalledWith(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Check if reportWebVitals is called
  expect(reportWebVitals).toHaveBeenCalled();
});
