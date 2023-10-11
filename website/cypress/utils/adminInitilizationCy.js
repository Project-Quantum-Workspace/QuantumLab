
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

  'GET /api/admin': async (req, res)=> {
    res.send(isUser);
  },
};

export const adminInitializationPosturl = '/api/admin*';
export const adminInitializationPostData = firstadmin;
export const adminInitializationGeturl = '/api/admin*';
export const adminInitializationGetData = isUser;

