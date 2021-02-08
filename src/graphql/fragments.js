import { gql } from '@apollo/client';

export const SESSION_ITEMS = gql`
  fragment SessionItems on Session {
    id
    totalLength
    notes
    user {
      id
      username
      instrument
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
  fragment UserITems on User {
    id
    username
    instrument
  }
`
