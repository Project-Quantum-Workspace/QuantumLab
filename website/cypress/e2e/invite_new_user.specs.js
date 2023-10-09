import {mockAuthIntercepts} from "../utils/authHelpers";

describe('Admin User List', () => {
  before(() => {
    mockAuthIntercepts();
    cy.autoLogin('workspacequantum@gmail.com', 'workspacequantum@gmail.com');
  });

  after(() => {
    cy.logout();
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/admin/users', { fixture: 'users.json' }).as('fetchUsers');

    // Intercept the POST request to invite users and mimic successful invitation
    cy.intercept('POST', '/api/admin/users/invite', {
      statusCode: 200,
      body: { message: 'Invitations sent successfully!' },
    });
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/admin/users`);
  });

  it('should render the "Invite New" button and it should not be disabled', () => {
    // Check if the button is rendered
    cy.contains('button', 'Invite New')
      .should('be.visible') // ensures the button is visible/rendered
      .and('not.be.disabled'); // ensures the button is not disabled
  });

  it('should open the "Invite New Users" modal upon clicking the "Invite New" button', () => {
    // Click the "Invite New" button
    cy.contains('button', 'Invite New').click();

    // Ensure the modal with the title "Invite New Users" is visible
    cy.get('.ant-modal-title').should('contain', 'Invite New Users').and('be.visible');

    // Check the presence of the textarea
    cy.get('.ant-modal-body textarea')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter emails, separated by commas, spaces, or new lines');

    // Check the "Cancel" button
    cy.get('.ant-modal-footer').contains('button', 'Cancel').should('be.visible');

    // Check the "Send" button (which is disabled in your example)
    cy.get('.ant-modal-footer').contains('button', 'Send').should('be.disabled');
  });

  it('should add emails to the modal textarea', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Type email addresses into the textarea
    cy.get('.ant-modal-body textarea')
      .type('user1@example.com, user2@example.com')
      .should('have.value', 'user1@example.com, user2@example.com'); // Ensure the textarea has the expected value
  });

  it('should remove an email from the list', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Type an email address into the textarea and add it
    cy.get('.ant-modal-body textarea').type('user1@example.com');
    cy.get('.ant-modal-footer').contains('button', 'Add').click();
    cy.get('button.ant-btn.ant-btn-default.ant-btn-sm')
      .find('span[role="img"][aria-label="close"]')
      .closest('button') // Navigate back to the button element
      .click(); // Perform the click action

    // Ensure the email is removed from the list
    cy.get('.ant-modal-body').should('not.contain', 'user1@example.com');
  });

  it('should add a correctly formatted email with green background', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Enter a correctly formatted email in the textarea
    const validEmail = 'test@example.com';
    cy.get('.ant-modal-body textarea').type(validEmail);

    // Click the "Add" button
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Check if the email is added with a green background
    cy.contains('span', validEmail)
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(150, 210, 101)'); // Green color
  });

  it('should add a incorrectly formatted email with salmon background', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Enter a correctly formatted email in the textarea
    const inValidEmail = 'test';
    cy.get('.ant-modal-body textarea').type(inValidEmail);

    // Click the "Add" button
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Check if the email is added with a green background
    cy.contains('span', inValidEmail)
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(250, 128, 114)'); // Green color
  });

  it('should enable the "Send" button after adding anything', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Get the "Send" button and assert that it is initially disabled
    cy.get('.ant-modal-footer button:contains("Send")').should('be.disabled');

    // Enter a correctly formatted email in the textarea
    const validEmail = 'text for testing';
    cy.get('.ant-modal-body textarea').type(validEmail);

    // Click the "Add" button
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Get the "Send" button again and assert that it is now enabled
    cy.get('.ant-modal-footer button:contains("Send")').should('not.be.disabled');
  });

  it('should display an error for duplicate emails', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Type duplicate emails into the textarea and add them
    cy.get('.ant-modal-body textarea').type('user@example.com, user@example.com');
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Ensure an error message is displayed
    cy.get('.ant-notification-notice').should('contain', 'Duplicate Email Detected');
  });

  it('should show an error for too many different emails', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Create an array of more than 100 different emails
    const differentEmails = new Array(101)
      .fill(0)
      .map((_, index) => `user${index}@example.com`)
      .join(', ');

    // Type the different emails into the textarea and add them
    cy.get('.ant-modal-body textarea').type(differentEmails);
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Ensure an error message is displayed
    cy.get('.ant-notification-notice').should('contain', 'Too Many Emails');
  });

  it('should show an error when sending invitations with incorrect email', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Enter an incorrect email in the textarea
    const incorrectEmail = 'invalid_email';
    cy.get('.ant-modal-body textarea').type(incorrectEmail);

    // Click the "Add" button
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Click the "Send" button
    cy.get('.ant-modal-footer').contains('button', 'Send').click();

    // Ensure an error message is displayed
    cy.get('.ant-notification-notice')
      .should('contain', 'Not Ready to Send: Invalid Email')
      .should('contain', `The following email is invalid: ${incorrectEmail}`);
  });

  it('should display an error for adding a duplicate email', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Enter an email address in the textarea
    const email = 'duplicate@example.com';
    cy.get('.ant-modal-body textarea').type(email);

    // Click the "Add" button to add the email
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Verify that the email is displayed
    cy.contains('span', email).should('be.visible');

    // Type the same email again in the textarea and click "Add" again
    cy.get('.ant-modal-body textarea').type(email);
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Verify that an error message is displayed for the duplicate email
    cy.get('.ant-notification-notice')
      .should('contain', 'Already Exist')
      .should('contain', `The email "${email}" is already in the list.`);
  });

  it('should successfully send invitations with correct emails', () => {
    // Click the "Invite New" button to open the modal
    cy.contains('button', 'Invite New').click();

    // Enter correct emails in the textarea
    const correctEmails = 'user1@example.com, user2@example.com';
    cy.get('.ant-modal-body textarea').type(correctEmails);

    // Click the "Add" button to add the correct emails
    cy.get('.ant-modal-footer').contains('button', 'Add').click();

    // Verify that the correct emails are displayed with green background
    cy.contains('span', 'user1@example.com').should(
      'have.css',
      'background-color',
      'rgb(150, 210, 101)',
    );
    cy.contains('span', 'user2@example.com').should(
      'have.css',
      'background-color',
      'rgb(150, 210, 101)',
    );

    // Click the "Send" button
    cy.get('.ant-modal-footer').contains('button', 'Send').click();

    // Verify the success message
    cy.get('.ant-notification-notice').should('contain', 'Invitations Sent');
  });
});
