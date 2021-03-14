import { gql } from '@apollo/client';
import { SESSION_ITEMS, SUBJECT_ITEMS, USER_ITEMS } from './fragments';

export const ADD_SESSION = gql`
  mutation addSession(
    $totalLength: Int!,
    $individualSubjects: [sessionSubjectInput!]!,
    $notes: String,
    $userID: String!,
  ) {
    addSession(
        userID: $userID
        totalLength: $totalLength
        notes: $notes
        individualSubjects: $individualSubjects
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

export const ADD_GOAL = gql`
  mutation addGoal($id: String!, $goal: goalInput!) {
    addGoal(
      id: $id,
      goal: $goal,
    ) {
      ...UserItems
    }
  }
${USER_ITEMS}
`;

export const DELETE_SESSION = gql`
  mutation deleteSession($id: String!) {
    deleteSession(id: $id) {
      ...SessionItems
    }
  }
${SESSION_ITEMS}
`;

export const EDIT_GOAL = gql`
  mutation editGoal($userID: String!, $goalID: String!, $time: Int!) {
    editGoal(userID: $userID, goalID: $goalID, time: $time) {
    id
    description
    subject
    targetTime
    elapsedTime
    deadline
    passed
  }
}
`;

export const DELETE_GOAL = gql`
  mutation deleteGoal($userID: String!, $goalID: String!) {
    deleteGoal(userID: $userID, goalID: $goalID) {
      ...UserItems
    }
  }
${USER_ITEMS}
`;

export const DELETE_SUBJECT = gql`
  mutation deleteSubject($name: String!) {
    deleteSubject(name: $name) {
      ...SubjectItems
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

export const LOG_OUT = gql`
  mutation {
    logOut
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
  mutation addSubject($name: String!, $description: String, $userID: String, $links: SubjectLinkInput) {
    addSubject(name: $name, description: $description, userID: $userID, links: $links) {
      name
      description
      id
      links {
        url
        description
      }
    }
  }
`;

export const ADD_LINK = gql`
  mutation addLink($url: String!, $description: String!, $subjectID: String!) {
    addLink(url: $url, description: $description, subjectID: $subjectID) {
      ...SubjectItems
    }
  }
${SUBJECT_ITEMS}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      token
      user {
        username
      }
    }
  }
`;
