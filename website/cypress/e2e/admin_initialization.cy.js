describe('Admin Initialization', () => {
  beforeEach(() => {
    // 使用cy.intercept模拟API响应以将hasUser设置为false
    cy.intercept('GET','/api/check-login', { fixture: 'hasUserFalse.json' }).as('checkLogin');

    // 访问登录页面
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/login`)

    // 等待API响应完成
    cy.wait('@checkLogin');
    // 访问登录页面
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/admin/adminInitialization`)
  });

  it('should display welcome message', () => {
    cy.contains('Welcome to our platform!').should('exist');
  });

  it('should submit the admin initialization form', () => {
    // 输入邮箱和密码
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('adminpassword');

    // 提交表单
    cy.get('button[type="submit"]').click();

    // 检查成功消息
    cy.contains('Admin Account Setup').should('exist');
    cy.contains('Your admin account has been successfully set up.').should('exist');

    // 检查是否重定向到登录页面
    cy.url().should('include', '/login');
  });

  it('should handle form submission error', () => {
    // 使用cy.intercept模拟API响应以模拟错误
    cy.intercept('/api/init', { statusCode: 500, body: 'Internal Server Error' }).as('initApi');

    // 输入邮箱和密码
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('adminpassword');

    // 提交表单
    cy.get('button[type="submit"]').click();

    // 等待API响应完成
    cy.wait('@initApi');

    // 检查错误消息
    cy.contains('Failed to set up admin account. Please try again.').should('exist');
  });
});
