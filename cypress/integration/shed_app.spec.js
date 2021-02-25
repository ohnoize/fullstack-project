describe('Note ', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Pick a subject to practice:')
    cy.contains('Practice clock')
  })
})