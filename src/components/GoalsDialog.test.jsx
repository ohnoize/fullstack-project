import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GoalsDialog from './GoalsDialog';

describe('<GoalsDialog />', () => {
  let component;
  let startButton;
  let cancelButton;
  let mockHandler;
  const goals = [
    {
      deadline: 'Wed Mar 17 2021 16:03:00 GMT-0400 (Eastern Daylight Time)',
      description: 'Practice Coltrane changes',
      passed: false,
      id: '604a3c129f42a70015e737e8',
      subject: 'Coltrane changes',
      targetTime: 18000,
      elapsedTime: 5000,
      __typename: 'Goal',
    },
  ];

  beforeEach(() => {
    mockHandler = jest.fn();
    component = render(
      <MockedProvider>
        <GoalsDialog
          goals={goals}
          open={() => null}
          setSubject={() => null}
          setOpen={() => null}
          handleStart={mockHandler}
        />
      </MockedProvider>,
    );
    startButton = component.getByText('Start practicing');
    cancelButton = component.getByText(/cancel/ig);
  });

  it('Renders correctly', () => {
    expect(component.getByText('My goals')).toBeInTheDocument();
    expect(component.getByText('Subject to practice:')).toBeInTheDocument();
    expect(component.getByText('Amount of time left to practice:')).toBeInTheDocument();
    expect(component.getByText('Deadline:')).toBeInTheDocument();
    expect(component.getByText('Start practicing')).toBeInTheDocument();
    expect(component.getByText('Cancel')).toBeInTheDocument();
  });
  it('Start button works', () => {
    fireEvent.click(startButton);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
  it('Cancel button works', () => {
    fireEvent.click(cancelButton);
    expect(mockHandler.mock.calls).toHaveLength(0);
  });
});
