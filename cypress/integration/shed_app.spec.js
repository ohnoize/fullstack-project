describe('Shed app ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.deleteTestSubject()
    cy.deleteTestSubject2()
    cy.deleteTestSession()
    cy.deleteTestUser()
  })
  it('front page can be opened', function() {
    cy.contains('Pick a subject to practice:')
    cy.contains('Shed App')
    cy.contains('Start').click()
  })
  it('Login page can be accessed', function() {
    cy.contains('Signup/Login').click()
  })
  it('Creating new account works, random text', function() {
    cy.contains('Signup/Login').click()
    cy.contains('Create account').click()
    cy.get('#username').type('cypressUser')
    cy.get('#password').type('cypressPassword')
    cy.get('#confirmPassword').type('cypressPassword')
    cy.get('#signup-button').click()
    cy.contains('New user cypressUser added!')
    cy.contains('Back').click()
    cy.deleteTestUser()
  })
  it('Logging in and out works', function() {
    cy.contains('Signup/Login').click()
    cy.contains('Create account').click()
    cy.get('#username').type('cypressUser')
    cy.get('#password').type('cypressPassword')
    cy.get('#confirmPassword').type('cypressPassword')
    cy.get('#signup-button').click()
    cy.contains('New user cypressUser added!')
    cy.contains('Back').click()
    cy.get('#username').type('cypressUser')
    cy.get('#password').type('cypressPassword')
    cy.get('#login-button').click()
    cy.contains('Welcome back cypressUser!')
    cy.contains('Log out').click()  
    cy.contains('Signup/Login')
    cy.contains('Pick a subject to practice:')
    cy.contains('Log in to save sessions')
    cy.deleteTestUser()
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Signup/Login').click()
      cy.contains('Create account').click()
      cy.get('#username').type('cypressUser')
      cy.get('#password').type('cypressPassword')
      cy.get('#confirmPassword').type('cypressPassword')
      cy.get('#signup-button').click()
      cy.contains('New user cypressUser added!')
      cy.contains('Back').click()
      cy.get('#username').type('cypressUser')
      cy.get('#password').type('cypressPassword')
      cy.get('#login-button').click()
    })
    it('Subjects can be added', function() {
      cy.contains('Add subject').click()
      cy.get('#subject').type('testSubject')
      cy.get('#description').type('Subject for cypress')
      cy.get('#submit-button').click()
      cy.contains('testSubject added as subject!')
      cy.contains('Back').click()
      cy.get('#subjectMenu').click()
      cy.contains('testSubject')
      cy.deleteTestSubject()
      cy.deleteTestUser()
    })
    it('Subjects can be added with links', function() {
      cy.contains('Add subject').click()
      cy.get('#subject').type('testSubject')
      cy.get('#description').type('Subject for cypress')
      cy.get('#addLink-button').click()
      cy.get('#url').type('http://www.testLink.com')
      cy.get('#linkDescription').type('Test link for cypress')
      cy.get('#addLink').click()
      cy.get('#submit-button').click()
      cy.contains('testSubject added as subject!')
      cy.contains('Back').click()
      cy.get('#subjectMenu').click()
      cy.contains('testSubject').click()
      cy.contains('Start').click()
      cy.contains('Test link for cypress')
      cy.deleteTestSubject()
      cy.deleteTestUser()
    })
    it('Sessions can be saved', function() {
      cy.contains('Add subject').click()
      cy.get('#subject').type('testSubject2')
      cy.get('#description').type('Subject for cypress')
      cy.get('#submit-button').click()
      cy.contains('testSubject2 added as subject!')
      cy.contains('Back').click()
      cy.get('#subjectMenu').click()
      cy.contains('testSubject2').click()
      cy.contains('Start').click()
      cy.contains('Now practicing testSubject2')
      cy.contains('Stop').click()
      cy.get('#notes').type('cypressSession')
      cy.contains('Finish session').click()
      cy.contains('Yes').click()
      cy.contains('Account').click()
      cy.contains('testSubject2')
      cy.contains('Notes: cypressSession')
      cy.deleteTestUser()
      cy.deleteTestSubject2()
      cy.deleteTestSession()
    })
    it('Notes can be added to subjects practiced', function() {
      cy.contains('Add subject').click()
      cy.get('#subject').type('testSubject2')
      cy.get('#description').type('Subject for cypress')
      cy.get('#submit-button').click()
      cy.contains('testSubject2 added as subject!')
      cy.contains('Back').click()
      cy.get('#subjectMenu').click()
      cy.contains('testSubject2').click()
      cy.contains('Start').click()
      cy.contains('Now practicing testSubject2')
      cy.get('#subjectNotes').type('note for cypress')
      cy.get('#addNoteButton').click()
      cy.contains('note for cypress')
      cy.deleteTestSubject2()
      cy.deleteTestUser()
    })
    it('Links can be added to subjects practiced', function() {
      cy.contains('Add subject').click()
      cy.get('#subject').type('testSubject2')
      cy.get('#description').type('Subject for cypress')
      cy.get('#submit-button').click()
      cy.contains('testSubject2 added as subject!')
      cy.contains('Back').click()
      cy.get('#subjectMenu').click()
      cy.contains('testSubject2').click()
      cy.contains('Start').click()
      cy.contains('Now practicing testSubject2')
      cy.get('#addLinkButton').click()
      cy.get('#url').type('http://www.testLink.com')
      cy.get('#linkDescription').type('Test link for cypress')
      cy.get('#addLink').click()
      cy.contains('New link added!')
      cy.contains('Test link for cypress')
      cy.deleteTestSubject2()
      cy.deleteTestUser()
    })
    it('Goals can be added', function() {
      cy.contains('Add subject').click()
      cy.get('#subject').type('testSubject2')
      cy.get('#description').type('Subject for cypress')
      cy.get('#submit-button').click()
      cy.contains('testSubject2 added as subject!')
      cy.contains('Back').click()
      cy.contains('Account').click()
      cy.contains('My goals').click()
      cy.contains('Add goal').click()
      cy.get('#goalDescription').type('Goal for cypress')
      cy.get('#goalSubjectMenu').click()
      cy.contains('testSubject2').click()
      cy.get('#targetTime').type('10')
      cy.get('#date-picker-inline').click()
      cy.contains(/ok/i).click()
      cy.get('#addGoalButton').click()
      cy.contains('New goal added!')
      cy.contains('Goal for cypress')
      cy.deleteTestSubject2()
      cy.deleteTestUser()
    })
  })
})