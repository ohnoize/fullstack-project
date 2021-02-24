import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import SubjectForm from './SubjectForm';

describe('<SubjectForm />', () => {
  let component;
  beforeEach(() => {
    component = render(
      <MockedProvider>
        <MemoryRouter>
          <SubjectForm />
        </MemoryRouter>
      </MockedProvider>,
    );
  });
  test('Renders correctly', () => {
    expect(component.getByText('Add subject')).toBeInTheDocument();
    expect(component.getByText('Cancel')).toBeInTheDocument();
  });
});
