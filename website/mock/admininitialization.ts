import { Request, Response } from 'express';

const firstadmin = {
  email: 'admin@gmail.com',
  password: 'admin@gmail.com'
}

const isUser = {
  "hasUser" : false
}
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export default {
  'POST /api/admin': async (req: Request, res: Response) => {
    res.send(firstadmin);
  },
};

export default {
  'GET /api/admin': async (req: Request, res: Response) => {
    res.send(isUser);
  },
};

