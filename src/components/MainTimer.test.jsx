import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import MainTimer from './MainTimer';
import { CURRENT_USER, GET_SUBJECTS } from '../graphql/queries';

const unloggedMocks = [
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
];

const loggedMocks = [
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
          id: '602ed9c12f630c7dfcbf384f',
          username: 'herbie',
          instrument: 'piano',
          joined: 'Thu Feb 18 2021 16:18:57 GMT-0500 (Eastern Standard Time)',
          subjectNotes: [
            {
              subjectID: '602db0d92290af5340dff611',
              date: 'Mon Mar 01 2021 18:52:44 GMT+0000 (Coordinated Universal Time)',
              notes: 'Bebop is hard',
            },
            {
              subjectID: '602db47c2290af5340dff61a',
              date: 'Mon Mar 01 2021 18:52:53 GMT+0000 (Coordinated Universal Time)',
              notes: 'Triads are good!',
            },
            {
              subjectID: '602db0d92290af5340dff611',
              date: 'Mon Mar 01 2021 18:53:12 GMT+0000 (Coordinated Universal Time)',
              notes: 'Bebop is good',
            },
          ],
          sessions: [
            {
              date: 'Thu Feb 18 2021 16:39:47 GMT-0500 (Eastern Standard Time)',
              id: '602edea32f630c7dfcbf385f',
              totalLength: 10,
              notes: 'Shedding some wayne tunes',
              userID: '602ed9c12f630c7dfcbf384f',
              individualSubjects: [
                {
                  name: 'Wayne Shorter tunes',
                  length: 10,
                },
              ],
            },
            {
              date: 'Mon Mar 01 2021 13:53:20 GMT-0500 (Eastern Standard Time)',
              id: '603d3821f5e5df00155a49d9',
              totalLength: 30,
              notes: 'Fun session',
              userID: '602ed9c12f630c7dfcbf384f',
              individualSubjects: [
                {
                  name: 'Triads',
                  length: 17,
                },
                {
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

const mockPracticeTime = {
  scales: 120,
  chords: 1200,
};

describe('<MainTimer />', () => {
  let component;
  describe('When not logged', () => {
    beforeEach(() => {
      component = render(
        <MockedProvider mocks={unloggedMocks} addTypename={false}>
          <MemoryRouter>
            <MainTimer practiceTime={mockPracticeTime} />
          </MemoryRouter>
        </MockedProvider>,
      );
    });
    it('Renders correctly', async () => {
      expect(component.getByText('Loading...'));
      const subjectText = await component.findByText(/Pick a subject to practice/ig);
      expect(subjectText).toBeInTheDocument();
      expect(component.getByText('Choose one')).toBeInTheDocument();
      expect(component.getByText('Add subject')).toBeInTheDocument();
      expect(component.getByText('Start')).toBeInTheDocument();
      expect(component.getByText('Stop')).toBeInTheDocument();
      expect(component.getByText('Time spent:')).toBeInTheDocument();
      expect(component.getByText(/Total:/ig)).toBeInTheDocument();
      expect(component.getByText('Log in to save sessions')).toBeInTheDocument();
      expect(component.getByText('Pick a subject and click start!')).toBeInTheDocument();
      const button = component.getByText('Start');
      fireEvent.click(button);
      expect(component.getByText('Pick a subject!')).toBeInTheDocument();
    });
  });
  describe('When logged in', () => {
    beforeEach(() => {
      component = render(
        <MockedProvider mocks={loggedMocks} addTypename={false}>
          <MemoryRouter>
            <MainTimer practiceTime={mockPracticeTime} token />
          </MemoryRouter>
        </MockedProvider>,
      );
    });
    it('Renders correctly', async () => {
      expect(component.getByText('Loading...'));
      const subjectText = await component.findByText(/Pick a subject to practice/ig);
      expect(subjectText).toBeInTheDocument();
      expect(component.getByText('Choose one')).toBeInTheDocument();
      expect(component.getByText('Add subject')).toBeInTheDocument();
      expect(component.getByText('Start')).toBeInTheDocument();
      expect(component.getByText('Stop')).toBeInTheDocument();
      expect(component.getByText('Time spent:')).toBeInTheDocument();
      expect(component.getByText(/Total:/ig)).toBeInTheDocument();
      expect(component.getByText('Finish session')).toBeInTheDocument();
      expect(component.getByText('Pick a subject and click start!')).toBeInTheDocument();
      const button = component.getByText('Start');
      fireEvent.click(button);
      expect(component.getByText('Pick a subject!')).toBeInTheDocument();
    });
  });
});
