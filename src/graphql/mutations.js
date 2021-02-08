import { gql } from '@apollo/client';

export const ADD_SESSION = gql`
  mutation addSession(
    $totalLength: Int!,
    $individualSubjects: [sessionSubjectInput!]!,
    $notes: String,
    $userID: ID!
  ) {
    addSession(
      session: {
        userID: $userID
        totalLength: $totalLength
        notes: $notes
        individualSubjects: $individualSubjects
      }
  ) {
      userID
      totalLength
    }
  }
`