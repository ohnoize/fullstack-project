import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AddLinkDialog from './AddLinkDialog';

describe('<AddLinkDialog />', () => {
  let component;
  // let addButton;
  // let cancelButton;
  // let mockHandler;
  const subject = [
    {
      id: '1',
      name: 'Subject 1',
    },
  ];
  beforeEach(() => {
    // mockHandler = jest.fn();
    component = render(
      <AddLinkDialog
        open
        setOpen={() => null}
        url="testUrl"
        subject={subject}
        setUrl={() => null}
        description="testDescription"
        setDescription={() => null}
        handleAddLink={() => null}
      />,
    );
    // addButton = component.getByText('Add link');
    // cancelButton = component.getByText(/cancel/ig);
  });

  it('Renders correctly', () => {
    expect(component.getAllByText('Add link')).toHaveLength(2);
    expect(component.getByText('Cancel')).toBeInTheDocument();
  });
});
