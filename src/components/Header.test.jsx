import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('<Header />', () => {
  let component;
  let mockHandler;
  describe('When logged in', () => {
    beforeEach(() => {
      const currentUser = {
        username: 'testUser',
      };
      const token = 'testToken';
      mockHandler = jest.fn;
      component = render(
        <MemoryRouter>
          <Header currentUser={currentUser} token={token} handleLogOut={mockHandler} />
        </MemoryRouter>,
      );
    });
    it('Renders correctly', () => {
      expect(component.getByText('Practice clock')).toBeInTheDocument();
      expect(component.getByText(/welcome back/ig)).toBeInTheDocument();
      expect(component.getByText(/testuser/ig)).toBeInTheDocument();
      expect(component.getByText('Home')).toBeInTheDocument();
      expect(component.getByText('History')).toBeInTheDocument();
      expect(component.getByText('Log out')).toBeInTheDocument();
      expect(component.queryByText('Signup/Login')).toBeNull();
    });
  });
  describe('When not logged in', () => {
    beforeEach(() => {
      const currentUser = '';
      const token = '';
      mockHandler = jest.fn;
      component = render(
        <MemoryRouter>
          <Header currentUser={currentUser} token={token} handleLogOut={mockHandler} />
        </MemoryRouter>,
      );
    });
    it('Renders correctly', () => {
      expect(component.getByText('Practice clock')).toBeInTheDocument();
      expect(component.queryByText(/welcome back/ig)).toBeNull();
      expect(component.queryByText('Home')).toBeNull();
      expect(component.queryByText('History')).toBeNull();
      expect(component.queryByText('Log out')).toBeNull();
      expect(component.getByText('Signup/Login')).toBeInTheDocument();
    });
  });
});
