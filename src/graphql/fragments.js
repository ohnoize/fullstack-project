import { gql } from '@apollo/client';

export const SESSION_ITEMS = gql`
  fragment SessionItems on Session {
    id
    date
    totalLength
    notes
    userID
    individualSubjects {
      name,
      length
    }
  }
`;

export const SUBJECT_ITEMS = gql`
  fragment SubjectItems on Subject {
    id
    name
    description
    timePracticed
    links {
      url
      description
    }
  }
`;

export const USER_ITEMS = gql`
  fragment UserItems on User {
    id
    username
    instrument
    joined
    goals {
      description
      subject
      targetTime
      deadline
      passed
    }
    mySubjects {
      subjectID
      subjectName
      timePracticed
      subjectNotes {
        date
        notes
      }
    }
    sessions {
      ...SessionItems
    }
  }
${SESSION_ITEMS}
`;
