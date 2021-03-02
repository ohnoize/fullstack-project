import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_SUBJECTS, CURRENT_USER } from '../graphql/queries';
import SessionHistory from './SessionHistory';

const mocks = [
  {
    request: {
      query: GET_SUBJECTS,
    },
    result: {
      data: {
        allSubjects: [
          {
            id: '6022a2c11e57471d3cdd4b19',
            name: 'scales',
            description: 'Practice scales',
            __typename: 'Subject',
          },
          {
            id: '6022a2cf1e57471d3cdd4b1a',
            name: 'chords',
            description: 'Practice chords',
            __typename: 'Subject',
          },
          {
            id: '602d85082290af5340dff60c',
            name: 'repertoire',
            description: 'Learn/work on pieces',
            __typename: 'Subject',
          },
          {
            id: '602daf862290af5340dff60d',
            name: 'Arpeggios',
            description: 'Study of chord tones played individually',
            __typename: 'Subject',
          },
          {
            id: '602db0d92290af5340dff611',
            name: 'Bebop scales',
            description: 'Eight note scales',
            __typename: 'Subject',
          },
        ],
      },
    },
  },
  {
    request: {
      query: CURRENT_USER,
    },
    result: {
      data: {
        me: {
          __typename: 'User',
          id: '602ed9c12f630c7dfcbf384f',
          username: 'herbie',
          instrument: 'piano',
          joined: 'Thu Feb 18 2021 16:18:57 GMT-0500 (Eastern Standard Time)',
          subjectNotes: [
            {
              __typename: 'SubjectNote',
              subjectID: '602db0d92290af5340dff611',
              date: 'Mon Mar 01 2021 18:52:44 GMT+0000 (Coordinated Universal Time)',
              notes: 'Bebop is hard',
            },
            {
              __typename: 'SubjectNote',
              subjectID: '602db47c2290af5340dff61a',
              date: 'Mon Mar 01 2021 18:52:53 GMT+0000 (Coordinated Universal Time)',
              notes: 'Triads are good!',
            },
            {
              __typename: 'SubjectNote',
              subjectID: '602db0d92290af5340dff611',
              date: 'Mon Mar 01 2021 18:53:12 GMT+0000 (Coordinated Universal Time)',
              notes: 'Bebop is good',
            },
          ],
          sessions: [
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
          ],
        },
      },
    },
  },
];

describe('<SessionHistory />', () => {
  let component;

  it('Renders loading page correctly', () => {
    component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SessionHistory />
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
        <SessionHistory />
      </MockedProvider>,
    );
    // const tree = component.toJSON();
    expect(getByText('Loading...')).toBeInTheDocument();
    const sessionNotes = await findByText(/Bebop is hard/ig);
    expect(sessionNotes).toBeInTheDocument();
    expect(getByText(/Shedding some wayne tunes/ig)).toBeInTheDocument();
    expect(getByText(/Wayne Shorter tunes/ig)).toBeInTheDocument();
  });
});
