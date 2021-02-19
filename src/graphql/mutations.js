import { gql } from '@apollo/client';
import { SESSION_ITEMS } from './fragments';

export const ADD_SESSION = gql`
  mutation addSession(
    $totalLength: Int!,
    $individualSubjects: [sessionSubjectInput!]!,
    $notes: String,
    $userID: String!,
    $date: String!
  ) {
    addSession(
        userID: $userID
        totalLength: $totalLength
        notes: $notes
        individualSubjects: $individualSubjects
        date: $date
  ) {
      ...SessionItems
    }
  }
${SESSION_ITEMS}
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $instrument: String, $password: String!) {
    addUser(username: $username, password: $password, instrument: $instrument) {
      id
      username
      instrument
    }
  }
`;

export const ADD_SUBJECT = gql`
  mutation addSubject($name: String!, $description: String) {
    addSubject(name: $name, description: $description) {
      name
      description
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      token
      user {
        id
        instrument
        username
        joined
      }
    }
  }
`;
