describe('New a Workspace Form', () => {
  beforeEach(() => {
    cy.autoLogin('workspacequantum@gmail.com','workspacequantum@gmail.com')
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/workspace/new`)
  })
  
  it("Show error message when user submit without selecting template", () => {
    cy.get('#name').type("test")
    cy.get('#tags').type("CPU, Quskit")
    cy.get('#description').type("a example test")
    cy.get('.ant-btn-primary').click()
    cy.get('.ant-notification-notice-message').should('exist').contains('Database Query Error')
  
    cy.get('.ant-notification-notice-message',{timeout: 10000}).should('not.exist')
    
  })
  it("Show error message when user submit without entering information", () => {
   
    cy.get('.ant-btn-primary').click()
    cy.get('#name_help > .ant-form-item-explain-error').should('exist')
  })
  
  it("Allows users to submit form with properly filled information",()=>{
    cy.get('#name').type("test")
    cy.get('#tags').type("CPU, Quskit")
    cy.get('#description').type("a example test")
    cy.get('.ant-select-selector').click()
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click()
    cy.get('.ant-btn-primary').click()
    cy.get('.ant-notification-notice-message').should('exist').contains('Success')
  
    cy.get('.ant-notification-notice-message',{timeout: 10000}).should('not.exist')
  
  })
  
  it("Template form is generated",()=>{
    cy.get('.ant-select-selector').click()
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click()
    cy.get('#availableZone')
    cy.get('#diskSize')
    
  })
  it("Allows users to go back to workspace page",()=>{
    cy.get('a > .ant-btn').click()
    cy.url().should('match',/\/workspace$/)
  })
})