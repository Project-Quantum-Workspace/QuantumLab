import { Request, Response } from 'express';
import { UserMetaData } from '@/utils/types/UserTypes';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const { ACCESS_ENV } = process.env;

let access = ACCESS_ENV === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

export default {

  'GET /api/auth/currUser': (req: Request, res: Response) => {
    const adminData: UserMetaData = {
      accessLevel: 10,
      accountStatus: true,
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      email: 'workspace@gmail.com',
      firstName: 'LoisW',
      id: 1,
      lastName: '-Admin',
      password: 'encoded-string',
      quantumlabToken: 'quantumlabToken',
      roles: [{
        id: 1,
        name: 'Admin'
      }],
      uuid: 'uuid',
      workspaces: []
    }
    
    const userData: UserMetaData = {
      accessLevel: 1,
      accountStatus: true,
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      email: 'workspace@gmail.com',
      firstName: 'LoisW',
      id: 1,
      lastName: '-User',
      password: 'encoded-string',
      quantumlabToken: 'quantumlabToken',
      roles: [{
        id: 1,
        name: 'User'
      }],
      uuid: 'uuid',
      workspaces: []
    }
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: 'Please Login!',
        success: true,
      });
      return;
    } else if (getAccess() === 'admin') {
      res.send(adminData);
    } else {
      res.send(userData);
    }
  },
  'POST /api/auth/login': async (req: Request, res: Response) => {
    const { password, email, type } = req.body;

    await waitTime(200);
    if (
      (password === 'admin' && email === 'admin') ||
      (password === 'workspacequantum@gmail.com' && email === 'workspacequantum@gmail.com')
    ) {
      res.send({
        status: 'Logged In Successfully',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    if (password === 'user' && email === 'user') {
      res.send({
        status: 'Logged In Successfully',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'POST /api/auth/logout': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'POST /api/workspace/create': (req: any, res: any) => {
    // Simulate an asynchronous API response with a delay (e.g., 500ms)
    setTimeout(() => {
      // Get the form data from the request body
      const formData = req.body;

      // You can log the received form data to check if it's correct
      console.log('Received form data:', formData);

      // Return a mocked response
      res.status(200).send({
        success: true,
        message: 'Form submission successful!',
      });
    }, 500);
  },

  'PUT /api/admin/users/:id': (req: Request, res: Response) => {
    res.status(200).send({ message: 'OK!' });
  },
};
