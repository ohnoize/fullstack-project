import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SessionHistory from './SessionHistory';

describe('<SessionHistory />', () => {
  let component;
  const sessions = [
    {
      __typename: 'Session',
      date: 'Thu Feb 18 2021 16:39:47 GMT-0500 (Eastern Standard Time)',
      id: '602edea32f630c7dfcbf385f',
      totalLength: 10,
      notes: 'Shedding some wayne tunes',
      userID: '602ed9c12f630c7dfcbf384f',
      individualSubjects: [
        {
          __typename: 'SessionSubject',
          name: 'Wayne Shorter tunes',
          length: 10,
        },
      ],
    },
    {
      __typename: 'Session',
      date: 'Mon Mar 01 2021 13:53:20 GMT-0500 (Eastern Standard Time)',
      id: '603d3821f5e5df00155a49d9',
      totalLength: 30,
      notes: 'Fun session',
      userID: '602ed9c12f630c7dfcbf384f',
      individualSubjects: [
        {
          __typename: 'SessionSubject',
          name: 'Triads',
          length: 17,
        },
        {
          __typename: 'SessionSubject',
          name: 'Bebop scales',
          length: 13,
        },
      ],
    },
  ];
  describe('When logged in', () => {
    beforeEach(() => {
      component = render(
        <MockedProvider>
          <SessionHistory sessions={sessions} />
        </MockedProvider>,
      );
    });
    it('Renders correctly', () => {
      expect(component.getByText('Sessions:')).toBeInTheDocument();
      expect(component.getAllByText(/total length/ig)).toHaveLength(2);
      expect(component.getAllByText(/subjects practiced/ig)).toHaveLength(2);
      expect(component.getByText(/triads/i)).toBeInTheDocument();
      expect(component.getByText(/Shedding some wayne tunes/i)).toBeInTheDocument();
    });
  });
});
