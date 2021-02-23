import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AlertDialog from './Alert';

describe('<Alert />', () => {
  let mockHandler;
  let button;
  let component;
  beforeEach(() => {
    const alertText = 'Alert test';
    mockHandler = jest.fn();
    component = render(
      <AlertDialog alertText={alertText} setOpen={() => null} open action={mockHandler} />,
    );
    button = component.getByText('Back');
  });
  it('Alert renders correctly', () => {
    expect(component.getByText('Alert test')).toBeInTheDocument();
  });
  it('Back button works', () => {
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
