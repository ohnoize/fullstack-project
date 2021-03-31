import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GoalsDialog from './GoalsDialog';

describe('<GoalsDialog />', () => {
  let component;
  let startButton;
  let closeButton;
  let mockHandler;
  const goals = [
    {
      deadline: 'Wed Mar 17 2023 16:03:00 GMT-0400 (Eastern Daylight Time)',
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
          open
          setSubject={() => null}
          setOpen={() => null}
          handleStart={mockHandler}
        />
      </MockedProvider>,
    );
    startButton = component.getByText('Start practicing');
    closeButton = component.getByText(/close/i);
  });

  it('Renders correctly', () => {
    expect(component.getByText('My goals')).toBeInTheDocument();
    expect(component.getByText(/subject to practice/ig)).toBeInTheDocument();
    expect(component.getByText(/amount of time left to practice/ig)).toBeInTheDocument();
    expect(component.getByText(/deadline/ig)).toBeInTheDocument();
    expect(component.getByText(/start practicing/ig)).toBeInTheDocument();
    expect(component.getByText('Close')).toBeInTheDocument();
  });
  it('Start button works', () => {
    fireEvent.click(startButton);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
  it('Close button works', () => {
    fireEvent.click(closeButton);
    expect(mockHandler.mock.calls).toHaveLength(0);
  });
});
