import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const { ACCESS_ENV } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ACCESS_ENV === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/auth/currUser': (req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: 'Please Login！',
        success: true,
      });
      return;
    }
    if (req.headers.authorization === 'Bearer admin-token') {
      res.send({
        success: true,
        
          firstName: 'LoisW-Admin',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          email: 'loisw@test.com',
          notifyCount: 12,
          unreadCount: 11,
          access: getAccess(),
          accessLevel:10
        
      });
    }
    if (req.headers.authorization === 'Bearer user-token') {
      res.send({
        success: true,
        
          firstName: 'LoisW-User',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          email: 'loisw@test.com',
          notifyCount: 12,
          unreadCount: 11,
          access: getAccess(),
          accessLevel:0
        
      });
    }
  },
  'POST /api/auth/login': async (req: Request, res: Response) => {
    const { password, email, type } = req.body;

    await waitTime(200);
    if (password === 'admin' && email === 'admin') {
      res.send({
        status: 'Logged In Successfully',
        type,
        currentAuthority: 'admin',
        accessToken: 'admin-token',
        refreshToken: 'admin-token',
      });
      access = 'admin';
      return;
    }
    if (password === 'workspacequantum@gmail.com' && email === 'workspacequantum@gmail.com') {
      res.send({
        status: 'Logged In Successfully',
        type,
        currentAuthority: 'admin',
        accessToken: 'admin-token',
        refreshToken: 'admin-token',
      });
      access = 'admin';
      return;
    }
    if (password === 'user' && email === 'user') {
      res.send({
        status: 'Logged In Successfully',
        type,
        currentAuthority: 'user',
        accessToken: 'user-token',
        refreshToken: 'user-token',
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
};
