import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import AddGoalDialog from './AddGoalDialog';

describe('<AddGoalDialog />', () => {
  let component;
  // let addButton;
  // let cancelButton;
  // let mockHandler;
  const subjects = [
    {
      id: '1',
      name: 'Subject 1',
    },
    {
      id: '2',
      name: 'Subject 2',
    },
  ];
  beforeEach(() => {
    component = render(
      <MockedProvider>
        <AddGoalDialog
          open
          setOpen={() => null}
          subjects={subjects}
          id="12345678"
          snack={() => null}
        />
      </MockedProvider>,
    );
    // mockHandler = jest.fn();
    // addButton = component.getByText('Add goal');
    // cancelButton = component.getByText(/cancel/ig);
  });

  it('Renders correctly', () => {
    expect(component.getAllByText('Add goal')).toHaveLength(2);
    expect(component.getByText('Cancel')).toBeInTheDocument();
  });
});
