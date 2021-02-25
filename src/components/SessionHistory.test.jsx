import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_SESSIONS } from '../graphql/queries';
import SessionHistory from './SessionHistory';

describe('<SessionHistory />', () => {
  const currentUser = {
    userName: 'herbie',
    id: '602ed9c12f630c7dfcbf384f',
    instrument: 'piano',
    joined: '22.22.2022',
  };
  const mocks = [
    {
      request: {
        query: GET_SESSIONS,
        variables: {
          userID: currentUser.id,
        },
      },
      result: {
        data: {
          allSessions: [
            {
              id: '602edea32f630c7dfcbf385f',
              date: 'Thu Feb 18 2021 16:39:47 GMT-0500 (Eastern Standard Time)',
              totalLength: 10,
              notes: 'Shedding some wayne tunes',
              userID: '602ed9c12f630c7dfcbf384f',
              __typename: 'Session',
              individualSubjects: [
                {
                  name: 'Wayne Shorter tunes',
                  length: 10,
                  __typename: 'SessionSubject',
                },
              ],
            },
          ],
        },
      },
    },
  ];
  let component;

  it('Renders loading page correctly', () => {
    component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SessionHistory currentUser={currentUser} />
      </MockedProvider>,
    );
    expect(component.getByText('Loading...')).toBeInTheDocument();
  });

  it('Renders full page initally', async () => {
    const { getByText, findByText } = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <SessionHistory currentUser={currentUser} />
      </MockedProvider>,
    );
    // const tree = component.toJSON();
    expect(getByText('Loading...')).toBeInTheDocument();
    const sessionNotes = await findByText(/notes/ig);
    expect(sessionNotes).toBeInTheDocument();
    expect(getByText(/Shedding some wayne tunes/ig)).toBeInTheDocument();
    expect(getByText(/Wayne Shorter tunes/ig)).toBeInTheDocument();
  });
});
