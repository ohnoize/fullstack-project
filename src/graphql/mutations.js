import { gql } from '@apollo/client';

export const ADD_SESSION = gql`
  mutation addSession(
    $totalLength: Int!,
    $individualSubjects: [sessionSubjectInput!]!,
    $notes: String,
    $userID: ID!,
    $date: String!
  ) {
    addSession(
        userID: $userID
        totalLength: $totalLength
        notes: $notes
        individualSubjects: $individualSubjects
        date: $date
  ) {
      userID
      totalLength
      notes
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`