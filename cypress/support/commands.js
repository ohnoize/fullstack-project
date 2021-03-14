const deleteTestSubject = `
  mutation {
    deleteSubject(name: "testSubject") {
      id
      name
      description
    }
  }
`

const deleteTestSubject2 = `
  mutation {
    deleteSubject(name: "testSubject2") {
      id
      name
      description
    }
  }
`

const deleteTestUser = `
  mutation {
    deleteUserByName(username: "cypressUser") {
      id
      username
    }
  }
`

const deleteTestSession = `
  mutation {
    deleteSessionByNotes(notes: "cypressSession") {
      id
      notes
      date
  }
}
`

const apiUrl = 'https://shed-app-api.herokuapp.com/graphql'

Cypress.Commands.add('deleteTestSubject', () => {
  cy.request({
    url: apiUrl,
    method: 'POST',
    body: { query: deleteTestSubject }
  })
})

Cypress.Commands.add('deleteTestSubject2', () => {
  cy.request({
    url: apiUrl,
    method: 'POST',
    body: { query: deleteTestSubject2 }
  })
})

Cypress.Commands.add('deleteTestSession', () => {
  cy.request({
    url: apiUrl,
    method: 'POST',
    body: { query: deleteTestSession }
  })
})

Cypress.Commands.add('deleteTestUser', () => {
  cy.request({
    url: apiUrl,
    method: 'POST',
    body: { query: deleteTestUser }
  })
})