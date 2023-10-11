import {
  adminInitializationPosturl,
  adminInitializationPostData,
  adminInitializationGeturl,
  adminInitializationGetData,
} from '../utils/adminInitilizationCy';

describe('Admin Initialization Page', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:8000/admin/login`);
    cy.intercept('GET', adminInitializationGeturl, adminInitializationGetData).as('getIsUser');
    cy.visit(`http://localhost:8000/admin/adminInitialization`);
  });

  after(() => {
    //cy.logout();
  });


  it('should successfully initialize admin account and redirect to login page', () => {
    cy.intercept('GET', adminInitializationGeturl, adminInitializationGetData).as('getIsUser');
    cy.visit(`http://localhost:8000/admin/adminInitialization`);
    cy.intercept('POST', adminInitializationPosturl, adminInitializationPostData).as('getAdmin');
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@getAdmin').should(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });

    cy.wait('@getIsUser').should(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });

    cy.contains('Admin Account Setup').should('be.visible');
    cy.url().should('include', '/login');
  });
});
