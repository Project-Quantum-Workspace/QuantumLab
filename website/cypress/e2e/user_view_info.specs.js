import { mockAuthIntercepts } from '../utils/authHelpers';

describe.skip('view user navi', () => {
  before(() => {
    mockAuthIntercepts();
    cy.autoLogin('workspacequantum@gmail.com', 'workspacequantum@gmail.com');
  });

  after(() => {
    cy.logout();
  });

  beforeEach(() => {
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/Admin/AdminView`);
  });

  it('check Viewing - GET function in the correct format', () => {
    cy.viewport(1920, 1080);

    cy.url().should('include', '/Admin/AdminView');

    cy.title().should('include', 'User Information');

    cy.get('.ant-layout-content');

    cy.get('.ant-layout-content > :nth-child(1) > h1');

    cy.get('.avatar');

    cy.get('h2');

    cy.get('.userInfor');

    cy.get('.ant-layout-footer');

    //////////// for checking 'GET' API success or not
    //check image
    cy.get('.avatar > img').should('have.attr', 'src').and('include', '.png');

    //check password
    cy.get('#userPassword')
      .invoke('text')
      .then((text) => {
        const containsString = text.includes('');
        const containsNumber = /\d+/.test(text);

        //Check if password contains number and string
        expect(containsString).to.be.true;
        expect(containsNumber).to.be.true;
      });

    //check email contains @ and .com
    cy.get('#userEmail')
      .invoke('text')
      .then((text) => {
        const emailPattern = /\S+@\S+\.\w+/; // email format

        const containsEmail = emailPattern.test(text);

        expect(containsEmail).to.be.true;
      });

    //check access level with positive integer
    cy.get('#userAcess')
      .invoke('text')
      .then((text) => {
        //text to  number
        const number = parseInt(text, 10);

        // Check if the number is a positive integer
        const isPositiveInteger = Number.isInteger(number) && number > 0;

        expect(isPositiveInteger).to.be.true;
      });

    //check the user account only belongs to True/False
    cy.get('#accountStatus')
      .invoke('text')
      .then((text) => {
        // Either "True" or "False"
        const isTrueOrFalse = /^true$|^false$/i.test(text);

        expect(isTrueOrFalse).to.be.true;
      });
  });

  it('View page redirects to edit page', () => {
    //jump to edit page
    cy.viewport(1920, 1080);

    cy.get('.ant-btn').should('be.visible').should('not.be.disabled');

    cy.get('.ant-btn')
      .click()
      .then(() => {
        cy.url().should('include', '/admin/adminUpdate');
      });

    cy.url().should('include', '/admin/adminUpdate');

    //back to view page
    cy.get('.ant-col-offset-2 > .ant-btn').should('be.visible').should('not.be.disabled');

    cy.get('.ant-col-offset-2 > .ant-btn').click();

    cy.url().should('include', '/admin/adminView');

    //log out from view page
    cy.get('.ant-pro-global-header-header-actions-avatar > .ant-dropdown-trigger').click();
  });
});
