import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import MainTimer from './MainTimer';
import { GET_SUBJECTS } from '../graphql/queries';

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
        <MockedProvider mocks={mocks} addTypename={false}>
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
      const currentUser = {
        username: 'herbie',
        id: '602ed9c12f630c7dfcbf384f',
        instrument: 'piano',
        joined: '22.22.2022',
      };
      component = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <MainTimer practiceTime={mockPracticeTime} currentUser={currentUser} />
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
