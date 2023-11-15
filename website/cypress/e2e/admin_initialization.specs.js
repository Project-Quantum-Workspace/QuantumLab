import {
  adminInitializationPosturl,
  adminInitializationPostData,
  adminInitializationGeturl,
  adminInitializationGetData,
} from '../utils/adminInitilizationCy';

describe('Admin Initialization Page', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:8000/login`);
    cy.intercept('GET', adminInitializationGeturl, adminInitializationGetData).as('getIsUser');
    cy.visit(`http://localhost:8000/adminInitialization`);
  });

  after(() => {
    //cy.logout();
  });


  it('should successfully initialize admin account and redirect to login page', () => {
    cy.intercept('GET', adminInitializationGeturl, adminInitializationGetData).as('getIsUser');
    cy.visit(`http://localhost:8000/adminInitialization`);
    cy.intercept('POST', adminInitializationPosturl, adminInitializationPostData).as('getAdmin');
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
  });
});
