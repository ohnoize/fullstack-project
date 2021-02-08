import { gql } from '@apollo/client';
import { USER_ITEMS, SUBJECT_ITEMS, SESSION_ITEMS } from './fragments'

export const GET_SUBJECTS = gql`
  query {
    allSubjects {
      ...SubjectItems
    }
  }
${SUBJECT_ITEMS}
`

export const GET_SESSIONS = gql`
  query {
    allSessions {
    ...SessionItems
    }
  }
${SESSION_ITEMS}
`

export const GET_USERS = gql`
  query {
    allUsers {
      ...UserItems
    }
  }
${USER_ITEMS}
`

