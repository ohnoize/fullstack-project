import { gql } from '@apollo/client';
import { SESSION_ITEMS, SUBJECT_ITEMS, USER_ITEMS } from './fragments';

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

export const ADD_NOTE = gql`
  mutation editUser($id: String!, $subjectNotes: subjectNotesInput!) {
    editUser(
      id: $id
      subjectNotes: $subjectNotes
    ) {
      ...UserItems
    }
  }
${USER_ITEMS}
`;

export const DELETE_SESSION = gql`
  mutation deleteSession($id: String!) {
    deleteSession(id: $id) {
      ...sessionItems
    }
  }
${SESSION_ITEMS}
`;

export const DELETE_SUBJECT = gql`
  mutation deleteSubject($name: String!) {
    deleteSubject(name: $name) {
      ...subjectItems
    }
  }
${SUBJECT_ITEMS}
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      username
      instrument
    }
  }
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
  mutation addSubject($name: String!, $description: String, $userID: String) {
    addSubject(name: $name, description: $description, userID: $userID) {
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
        ...UserItems
      }
    }
  }
${USER_ITEMS}
`;
