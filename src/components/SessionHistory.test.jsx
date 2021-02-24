import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer';
// import { waitFor, queryByText } from '@testing-library/react';
// import wait from 'waait';
import { MockedProvider } from '@apollo/client/testing';
// import { GET_SESSIONS } from '../graphql/queries';
import SessionHistory from './SessionHistory';

describe('<SessionHistory />', () => {
  const mocks = [];
  let component;
  let currentUser;
  beforeEach(() => {
    currentUser = {
      userName: 'herbie',
      userID: '602ed9c12f630c7dfcbf384f',
    };
  });
  it('Renders loading page correctly', () => {
    component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SessionHistory currentUser={currentUser} />
      </MockedProvider>,
    );
    const tree = component.toJSON();
    expect(tree.children).toContain('Loading...');
  });

  //   it('Renders full page initally', async () => {
  //     const sessionsMock = [{
  //       request: {
  //         query: GET_SESSIONS,
  //         variables: {
  //           userID: '602edea32f630c7dfcbf385f',
  //         },
  //       },
  //       result: {
  //         data: {
  //           allSessions: [
  //             {
  //               id: '602edea32f630c7dfcbf385f',
  //               date: 'Thu Feb 18 2021 16:39:47 GMT-0500 (Eastern Standard Time)',
  //               totalLength: 10,
  //               notes: 'Shedding some wayne tunes',
  //               userID: '602ed9c12f630c7dfcbf384f',
  //               individualSubjects: [
  //                 {
  //                   name: 'Wayne Shorter tunes',
  //                   length: 10,
  //                 },
  //               ],
  //             },
  //           ],
  //         },

//       },
//     }];
//     component = TestRenderer.create(
//       <MockedProvider
//         mocks={sessionsMock}
//         addTypename={false}
//         defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
//       >
//         <SessionHistory currentUser={currentUser} />
//       </MockedProvider>,
//     );
//     await new Promise((resolve) => setTimeout(resolve, 0));
//     component.debug();
//     expect(1).toBe(1);
//   });
});
