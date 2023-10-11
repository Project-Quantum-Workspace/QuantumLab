
const firstadmin = {
  email: 'admin@gmail.com',
  password: 'admin@gmail.com'
}

const isUser = {
  "hasUser" : false
}

export default {
  'POST /api/admin': async (req, res)=> {
    res.send(firstadmin);
  },

  'GET /api/admin/hasUser': async (req, res)=> {
    res.send(isUser);
  },
};

export const adminInitializationPosturl = '/api/admin';
export const adminInitializationPostData = firstadmin;
export const adminInitializationGeturl = '/api/admin/hasUser';
export const adminInitializationGetData = isUser;

