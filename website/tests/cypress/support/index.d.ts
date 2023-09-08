declare namespace Cypress {
  interface Chainable<Subject> {
    autoLogin(uemail: string, upassword: string): Chainable<any>;
  }
}
