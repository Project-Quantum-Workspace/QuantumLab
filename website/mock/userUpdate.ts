import {Request, Response} from 'express';

const users = [
  {
    "email": "1234@example.com",
    "uuid": "uuid1",
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "accountStatus": true,
    "accessLevel": 5,
    "roles": [{ "id": 1, "name": "Admin" }]
  },
];


export default {
  'GET /api/usersUpdate': (req: Request, res: Response) => {
    res.send(users);
  },
};
