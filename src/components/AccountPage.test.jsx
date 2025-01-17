import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CURRENT_USER, GET_SUBJECTS } from '../graphql/queries';
import AccountPage from './AccountPage';

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
            timePracticed: 123,
            __typename: 'Subject',
            links: [
              {
                __typename: 'SubjectLink',
                url: 'https://en.wikipedia.org/wiki/Chord_(music)',
                description: 'Chord (music) - Wikipedia',
              },
              {
                __typename: 'SubjectLink',
                url: 'https://www.youtube.com/watch?v=K_T-jYyQCbQ',
                description: 'Beautiful chords! (everyone should know)',
              },
            ],
          },
          {
            id: '6022a2cf1e57471d3cdd4b1a',
            name: 'chords',
            description: 'Practice chords',
            timePracticed: 12442,
            __typename: 'Subject',
            links: [
              {
                __typename: 'SubjectLink',
                url: 'https://en.wikipedia.org/wiki/Repertoire',
                description: 'Repertoire - Wikipedia',
              },
              {
                __typename: 'SubjectLink',
                url: 'https://en.wikipedia.org/wiki/Classical_guitar_repertoire',
                description: 'Classical guitar repertoire - Wikipedia',
              },
            ],
          },
          {
            id: '602db0d92290af5340dff611',
            name: 'Bebop scales',
            description: 'Eight note scales',
            timePracticed: 124123,
            __typename: 'Subject',
            links: [
              {
                __typename: 'SubjectLink',
                url: 'https://en.wikipedia.org/wiki/Bebop_scale',
                description: 'Bebop scale - Wikipedia',
              },
              {
                __typename: 'SubjectLink',
                url: 'https://www.youtube.com/watch?v=F8JJncSUdUU',
                description: 'Jazz Theory with Barry Harris',
              },
            ],
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
          id: '6041727761c1360ea386c558',
          username: 'testUser',
          instrument: null,
          goals: [
            {
              id: '60494fa4d8a5de0015c36b28',
              deadline: 'Wed Mar 17 2021 16:03:00 GMT-0400 (Eastern Daylight Time)',
              description: 'Practice Coltrane changes',
              passed: false,
              subject: 'Coltrane changes',
              targetTime: 18000,
              elapsedTime: 12340,
              __typename: 'Goal',
            },
          ],
          mySubjects: [
            {
              __typename: 'MySubject',
              subjectID: '6041728961c1360ea386c559',
              subjectName: 'test subject 1',
              timePracticed: 444,
              subjectNotes: [
                {
                  __typename: 'SubjectNote',
                  subjectID: '6041728961c1360ea386c559',
                  date: 'Thu Mar 04 2021 18:53:13 GMT-0500 (Eastern Standard Time)',
                  notes: 'notes for 1',
                },
                {
                  __typename: 'SubjectNote',
                  subjectID: '6041728961c1360ea386c559',
                  date: 'Thu Mar 04 2021 18:53:20 GMT-0500 (Eastern Standard Time)',
                  notes: 'more notes for 1',
                },
              ],
            },
            {
              __typename: 'MySubject',
              subjectID: '6041728f61c1360ea386c55b',
              subjectName: 'test subject 2',
              timePracticed: 888,
              subjectNotes: [
                {
                  __typename: 'SubjectNote',
                  subjectID: '6041728f61c1360ea386c55b',
                  date: 'Thu Mar 04 2021 18:53:55 GMT-0500 (Eastern Standard Time)',
                  notes: 'no notes for 2',
                },
                {
                  __typename: 'SubjectNote',
                  subjectID: '6041728f61c1360ea386c55b',
                  date: 'Thu Mar 04 2021 18:54:03 GMT-0500 (Eastern Standard Time)',
                  notes: 'just kidding',
                },
              ],
            },
          ],
          joined: 'Thu Mar 04 2021 18:51:19 GMT-0500 (Eastern Standard Time)',
          sessions: [
            {
              __typename: 'Session',
              id: '604172b361c1360ea386c55d',
              date: 'Thu Mar 04 2021 18:52:19 GMT-0500 (Eastern Standard Time)',
              totalLength: 1200,
              notes: 'Test session 1',
              userID: '6041727761c1360ea386c558',
              individualSubjects: [
                {
                  name: 'test subject 1',
                  length: 111,
                },
                {
                  name: 'test subject 2',
                  length: 222,
                },
              ],
            },
            {
              __typename: 'Session',
              id: '604172ca61c1360ea386c560',
              date: 'Thu Mar 04 2021 18:52:42 GMT-0500 (Eastern Standard Time)',
              totalLength: 1200,
              notes: 'Test session 2',
              userID: '6041727761c1360ea386c558',
              individualSubjects: [
                {
                  __typename: 'SessionSubject',
                  name: 'test subject 1',
                  length: 111,
                },
                {
                  __typename: 'SessionSubject',
                  name: 'test subject 2',
                  length: 222,
                },
              ],
            },
            {
              __typename: 'Session',
              id: '604176d5cfb0e50f303147e8',
              date: 'Thu Mar 04 2021 19:09:57 GMT-0500 (Eastern Standard Time)',
              totalLength: 1200,
              notes: 'Test session 3',
              userID: '6041727761c1360ea386c558',
              individualSubjects: [
                {
                  __typename: 'SessionSubject',
                  name: 'test subject 1',
                  length: 111,
                },
                {
                  __typename: 'SessionSubject',
                  name: 'test subject 2',
                  length: 222,
                },
              ],
            },
            {
              __typename: 'Session',
              id: '60417ad85518f91056e19f06',
              date: 'Thu Mar 04 2021 19:27:04 GMT-0500 (Eastern Standard Time)',
              totalLength: 1200,
              notes: 'Test session 4',
              userID: '6041727761c1360ea386c558',
              individualSubjects: [
                {
                  __typename: 'SessionSubject',
                  name: 'test subject 1',
                  length: 111,
                },
                {
                  __typename: 'SessionSubject',
                  name: 'test subject 2',
                  length: 222,
                },
              ],
            },
            {
              __typename: 'Session',
              id: '60417be6aa751010a566b0c8',
              date: 'Thu Mar 04 2021 19:31:34 GMT-0500 (Eastern Standard Time)',
              totalLength: 1200,
              notes: 'test session 5',
              userID: '6041727761c1360ea386c558',
              individualSubjects: [
                {
                  __typename: 'SessionSubject',
                  name: 'scales',
                  length: 120,
                },
                {
                  __typename: 'SessionSubject',
                  name: 'chords',
                  length: 1500,
                },
              ],
            },
          ],
        },
      },
    },
  },
];

describe('<AccountPage />', () => {
  it('Renders full page initally, random text here', async () => {
    const component = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <AccountPage />
      </MockedProvider>,
    );
    // const tree = component.toJSON();
    // expect(getByText('Loading...')).toBeInTheDocument();
    const sessionNotes = await component.findByText(/Member since/ig);
    expect(sessionNotes).toBeInTheDocument();
    expect(component.getByText(/test session 1/ig)).toBeInTheDocument();
    expect(component.getByText(/test session 2/ig)).toBeInTheDocument();
    expect(component.getByText(/Member since/ig)).toBeInTheDocument();
    expect(component.getAllByText(/Sessions/ig)).not.toHaveLength(0);
    expect(component.getAllByText(/Subjects practiced/ig)).not.toHaveLength(0);
    expect(component.getByText(/Total time practiced/ig)).toBeInTheDocument();
    expect(component.getByText(/My goals/ig)).toBeInTheDocument();
  });
});
