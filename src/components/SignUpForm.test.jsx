import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  let component;
  beforeEach(() => {
    component = render(
      <MockedProvider>
        <MemoryRouter>
          <SignUpForm />
        </MemoryRouter>
      </MockedProvider>,
    );
  });
  test('Renders correctly', () => {
    expect(component.getByText('Create account')).toBeInTheDocument();
    expect(component.getByText('Cancel')).toBeInTheDocument();
  });
});
