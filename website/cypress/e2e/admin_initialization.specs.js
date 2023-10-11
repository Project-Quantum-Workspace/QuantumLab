import {
  adminInitializationPosturl,
  adminInitializationPostData,
  adminInitializationGeturl,
  adminInitializationGetData,
} from '../utils/adminInitilizationCy';

describe('Admin Initialization Page', () => {
  beforeEach(() => {
    cy.intercept('POST', adminInitializationPosturl, adminInitializationPostData).as('getAdmin');
    cy.intercept('GET', adminInitializationGeturl, adminInitializationGetData).as('getIsUser');
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/admin/adminInitialization`);
  });

  after(() => {
    cy.logout();
  });

  it('should display initial form elements', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should successfully initialize admin account and redirect to login page', () => {
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@getAdmin').should(({ response }) => {
      expect(response.statusCode).to.equal(200);
      // 可以验证响应的其他属性，如是否包含特定的字段等
    });

    cy.wait('@getIsUser').should(({ response }) => {
      expect(response.statusCode).to.equal(200);
      // 可以验证响应的其他属性，如是否包含特定的字段等
    });

    cy.contains('Admin Account Setup').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('should handle invalid initialization attempt and show error message', () => {
    cy.get('input[name="email"]').type('invalidemail@example.com');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@getAdmin').should(({ response }) => {
      expect(response.statusCode).to.equal(400);
      // 可以验证响应的其他属性，如是否包含特定的错误消息等
    });

    cy.contains('Failed to set up admin account. Please try again.').should('be.visible');
  });
});
