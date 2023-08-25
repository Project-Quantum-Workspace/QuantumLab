// mock/adminUserList.ts

const users = [
  {
    email: 'alice@example.com',
    uuid: '1a2b3c',
    id: 1,
    accountStatus: 1,
    accessLevel: 1,
    role: 'Admin',
  },
  {
    email: 'bob@example.com',
    uuid: '4d5e6f',
    id: 2,
    accountStatus: 0,
    accessLevel: 0,
    role: 'User',
  },
];

export default {
  'GET /api/admin/users': (req, res) => {
    res.send(users);
  },

  'PATCH /api/admin/users': (req, res) => {
    const { uuid, accountStatus, accessLevel } = req.body;

    const user = users.find((u) => u.uuid === uuid);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    user.accountStatus = accountStatus;
    user.accessLevel = accessLevel;

    res.send({ message: 'User updated successfully' });
  },
};
