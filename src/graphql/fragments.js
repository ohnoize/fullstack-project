import { gql } from '@apollo/client';

export const SESSION_ITEMS = gql`
  fragment SessionItems on Session {
    id
    totalLength
    notes
    userID
    individualSubjects {
      id,
      length
    }
  }
`

export const SUBJECT_ITEMS = gql`
  fragment SubjectItems on Subject {
    id
    name
    description
  }
`

export const USER_ITEMS = gql`
  fragment UserItems on User {
    id
    username
    instrument
  }
`
