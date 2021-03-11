import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import MySubjects from './MySubjects';

describe('<MySubjects />', () => {
  let component;
  const subjects = [
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
  ];

  describe('When logged in', () => {
    beforeEach(() => {
      component = render(
        <MockedProvider>
          <MySubjects mySubjects={subjects} />
        </MockedProvider>,
      );
    });
    it('Renders correctly', () => {
      expect(component.getByText('Subjects practiced:')).toBeInTheDocument();
      expect(component.getAllByText(/total time/ig)).toHaveLength(2);
      expect(component.getAllByText(/test subject/ig)).not.toHaveLength(0);
      expect(component.getByText(/just kidding/i)).toBeInTheDocument();
      expect(component.getByText(/no notes for 2/i)).toBeInTheDocument();
    });
  });
});
