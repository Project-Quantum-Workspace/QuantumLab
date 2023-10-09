// cypress/fixtures/authResponses.js
export const currUserAdmin = {
  id: 1,
  success: true,
  firstName: 'LoisW-Admin',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  email: 'loisw@test.com',
  notifyCount: 12,
  unreadCount: 11,
  access: 'admin',
  accessLevel:10
};

export const currUserRegular = {
  success: true,
  firstName: 'LoisW-User',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  email: 'loisw@test.com',
  notifyCount: 12,
  unreadCount: 11,
  access: 'user',
  accessLevel:0
};

// ... Define other mock responses for login, logout, etc.
