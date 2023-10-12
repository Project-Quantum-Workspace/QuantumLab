import { Response } from 'express';
import { UserTokenType } from '@/utils/types/UserTypes';


export default {
  'GET /api/token/list': (req: Request, res: Response) => {
    const userToken: UserTokenType[] =  [
      {
        id: 1,
        name: 'IBM',
        value: 'kjbiuwag9dyf9813698yerdoiwqgdgquicsbijqgwodyd1982tr9813gudifvbcqwifcio1wy98f18t3fgr',
      },
      {
        id: 2,
        name: 'BRAKET',
        value: 'kjbiuwag9dyf9813698yerdoiwqgdgquicsbijqgwodyd1982tr9813gudifvbcqwifcio1wy98f18t3fgr',
      }]
    res.send(userToken)
  },
  'POST /api/token/add': (req: Request, res: Response) => {
    res.send({"message": "Successfully added token!"})
  },
  'PATCH /api/token/edit': (req: Request, res: Response) => {
    res.send({"message": "Successfully modified token!"})
  },
  'DELETE /api/token/remove': (req: Request, res: Response) => {
    res.send({"message": "Successfully deleted token!"})
  },
};