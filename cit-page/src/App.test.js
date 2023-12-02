import { render, screen } from '@testing-library/react';
import App from './App';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


test('renders the HomePage component when on the home route', () => {
  render(
    <Router>
      <App />
    </Router>
  );

});

