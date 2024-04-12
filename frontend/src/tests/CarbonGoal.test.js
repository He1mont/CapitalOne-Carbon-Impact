//CarbonGoal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CarbonGoal from './CarbonGoal';

describe('CarbonGoal', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <CarbonGoal />
        </MemoryRouter>
      );
    });
  
    it('renders expected elements in the header', () => {
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.getByAltText('Back')).toBeInTheDocument();
    });
  
    it('renders the expected elements in the mid section', () => {
      expect(screen.getByText('Carbon Goal')).toBeInTheDocument();
    });
  
    it('renders the expected elements in the low section', () => {
      expect(screen.getByLabelText('Expected Goal:')).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
    });
  
    it('updates the expected goal when input changes', () => {
      const expectedGoalInput = screen.getByLabelText('Expected Goal:');
      fireEvent.change(expectedGoalInput, { target: { value: '100' } });
      expect(expectedGoalInput.value).toBe('100');
    });
  
    it('navigates to the details page when "Details" button is clicked', () => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <CarbonGoal />
        </Router>
      );
  
      fireEvent.click(screen.getByText('Details'));
      expect(history.location.pathname).toBe('/Goal');
    });
  
  });