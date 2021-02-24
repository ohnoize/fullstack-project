import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  let component;
  beforeEach(() => {
    component = render(
      <MockedProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </MockedProvider>,
    );
  });
  test('Renders correctly', () => {
    expect(component.getByText('Login')).toBeInTheDocument();
    expect(component.getByText('Create account')).toBeInTheDocument();
    expect(component.getByText('Cancel')).toBeInTheDocument();
  });
});
