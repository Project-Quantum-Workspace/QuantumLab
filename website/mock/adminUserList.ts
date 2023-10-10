import {Request, Response} from 'express';

const users = [
  {
    "email": "john@example.com",
    "uuid": "uuid1",
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "accountStatus": true,
    "accessLevel": 5,
    "roles": [{ "id": 1, "name": "Admin" }]
  },
  {
    "email": "jane@example.com",
    "uuid": "uuid2",
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "accountStatus": false,
    "accessLevel": 3,
    "roles": [{ "id": 2, "name": "User" }]
  }
];


export default {
  'GET /api/admin/users': (req: Request, res: Response) => {
    res.send(users);
  },

  'PATCH /api/admin/users/:id/status': (req: Request, res: Response) => {
    const { accountStatus } = req.body;
    const id = parseInt(req.params.id);

    const user = users.find((u) => u.id === id);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    user.accountStatus = accountStatus;

    res.send({ message: 'User updated successfully' });
  },

  'POST /api/admin/users/invite': (req: Request, res: Response) => {
    const {body} = req;

    console.log('Inviting the following emails:', body.emails);

    // Return a successful response:
    res.status(200).send({
      message: 'Invitations sent successfully!',
    });
  },
};
