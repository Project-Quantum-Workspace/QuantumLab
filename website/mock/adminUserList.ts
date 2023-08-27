import { Request, Response } from 'express';

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
  'GET /api/admin/users': (req: Request, res: Response) => {
    res.send(users);
  },

  'PATCH /api/admin/users': (req: Request, res: Response) => {
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

  'POST /api/admin/users/invite': (req: Request, res: Response) => {
    const { body } = req;

    console.log('Inviting the following emails:', body.emails);

    // Return a successful response:
    res.status(200).send({
      message: 'Invitations sent successfully!',
    });
  },
};
