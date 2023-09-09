// adminInitialization.spec.js
describe('Admin Initialization', () => {
  it('successfully sets up admin account', () => {
    cy.visit('https://feature-admin-initializtion.dev.quantumlab.cloud/admininitialization'); 
    // Fill in the email and password fields
    cy.get('#email').should('have.value', 'workspacequantum@gmail.com');
    cy.get('#password"]').type('have.value','workspacequantum@gmail.com');

    // Submit the form
    cy.get('button[type="submit"].ant-btn.ant-btn-primary')
    .should('exist') // Check if the button exists
    .should('contain', 'Submit'); // Check if the button contains the text 'Submit'
  });
});
