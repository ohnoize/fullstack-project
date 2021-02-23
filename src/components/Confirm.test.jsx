import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import ConfirmDialog from './Confirm';

describe('<Confirm />', () => {
  let component;
  let yesButton;
  let noButton;
  let mockHandler;
  beforeEach(() => {
    const confirmText = 'Confirm test';
    mockHandler = jest.fn();
    component = render(
      <ConfirmDialog
        confirmText={confirmText}
        setOpen={() => null}
        open
        action={mockHandler}
      />,
    );
    yesButton = component.getByText('Yes');
    noButton = component.getByText('No');
  });

  it('Confirm renders correctly', () => {
    expect(component.getByText('Confirm test')).toBeInTheDocument();
  });

  it('Yes button works', () => {
    fireEvent.click(yesButton);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });

  it('No button works', () => {
    fireEvent.click(noButton);
    expect(mockHandler.mock.calls).toHaveLength(0);
  });
});
