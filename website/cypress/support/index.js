import './commands';
import {mockAuthIntercepts} from "../utils/authHelpers";
beforeEach(() => {
    mockAuthIntercepts();
    cy.autoLogin('workspacequantum@gmail.com', 'workspacequantum@gmail.com');
});
