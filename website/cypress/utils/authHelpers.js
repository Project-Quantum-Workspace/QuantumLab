// cypress/utils/authHelpers.js
import { currUserAdmin, currUserRegular } from '../fixtures/authResponses';

export function mockAuthIntercepts() {
  let access = '';

  // Mock /api/auth/currUser
  cy.intercept('GET', '/api/auth/currUser*', (req) => {
    if (access === '') {
      req.reply(401, {
        data: { isLogin: false },
        errorCode: '401',
        errorMessage: 'Please Login!',
        success: true,
      });
    } else if (access === 'admin') {
      req.reply(currUserAdmin);
    } else {
      req.reply(currUserRegular);
    }
  }).as('authRequest');

  // Mock /api/auth/login
  cy.intercept('POST', '/api/auth/login*', (req) => {
    const { password, email, type } = req.body;
    if (
      (password === 'admin' && email === 'admin') ||
      (password === 'workspacequantum@gmail.com' && email === 'workspacequantum@gmail.com')
    ) {
      req.reply({
        status: 'Logged In Successfully',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    if (password === 'user' && email === 'user') {
      req.reply({
        status: 'Logged In Successfully',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }

    req.reply({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  }).as('loginRequest');
}
