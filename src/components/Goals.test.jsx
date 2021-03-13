import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Goals from './Goals';

describe('<Goals />', () => {
  let component;
  const goals = [
    {
      description: 'testGoal',
      subject: 'testSubject',
      targetTime: 20000,
      elapsedTime: 5000,
      deadline: new Date('12/12/2031'),
      passed: false,
    },
    {
      description: 'testGoal2',
      subject: 'testSubject2',
      targetTime: 200002,
      elapsedTime: 50002,
      deadline: new Date('10/13/2021'),
      passed: false,
    },
    {
      description: 'testGoal3',
      subject: 'testSubject3',
      targetTime: 200002,
      elapsedTime: 50002,
      deadline: new Date('10/13/2002'),
      passed: false,
    },
  ];
  describe('When logged in', () => {
    beforeEach(() => {
      component = render(
        <MockedProvider>
          <Goals goals={goals} subjects={null} id={null} snack={() => null} />
        </MockedProvider>,
      );
    });
    it('Renders correctly', () => {
      expect(component.getByText('My Goals')).toBeInTheDocument();
      expect(component.getByText(/add goal/ig)).toBeInTheDocument();
      expect(component.getByText(/active/ig)).toBeInTheDocument();
      expect(component.getByText(/past/ig)).toBeInTheDocument();
      expect(component.getAllByText(/testGoal/ig)).not.toHaveLength(0);
      expect(component.getAllByText(/testSubject/ig)).not.toHaveLength(0);
      expect(component.getByText(/testGoal2/i)).toBeInTheDocument();
      expect(component.getByText(/testSubject2/i)).toBeInTheDocument();
    });
  });
});
