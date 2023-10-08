// cypress/utils/authHelpers.js
import { currUserAdmin, currUserRegular } from '../fixtures/authResponses';

export function mockAuthIntercepts() {
  const { ACCESS_ENV } = process.env;
  let access = ACCESS_ENV === 'site' ? 'admin' : '';

  const getAccess = () => {
    return access;
  };
  // Mock /api/auth/currUser
  cy.intercept('GET', '/api/auth/currUser', (req) => {
    if (!getAccess()) {
      req.reply(401, {
        data: { isLogin: false },
        errorCode: '401',
        errorMessage: 'Please Login!',
        success: true,
      });
    } else if (getAccess() === 'admin') {
      req.reply(currUserAdmin);
    } else {
      req.reply(currUserRegular);
    }
  });

  // Mock /api/auth/login
  cy.intercept('POST', '/api/auth/login', (req) => {
    const { password, email } = req.body;
    if (
      (password === 'admin' && email === 'admin') ||
      (password === 'workspacequantum@gmail.com' && email === 'workspacequantum@gmail.com')
    ) {
      req.reply({
        status: 'Logged In Successfully',
        type: req.body.type,
        currentAuthority: 'admin',
      });
    } else if (password === 'user' && email === 'user') {
      req.reply({
        status: 'Logged In Successfully',
        type: req.body.type,
        currentAuthority: 'user',
      });
    } else {
      req.reply({ status: 'error', type: req.body.type, currentAuthority: 'guest' });
    }
  });
}
