import { BaseApi } from '@/utils/BaseApi';
import { UserTokenType } from '@/utils/types/UserTypes';
import { message } from 'antd';

class TokenApi extends BaseApi {
  getUserToken() {
    return this.loadByGet('/api/token/list')
      .then((res) => {
        let token: UserTokenType[] = []
        if (Array.isArray(res)) {
          res.forEach((t: UserTokenType) => {
            token.push(t)
          });
        }
        return token
      })
      .catch((error) => { message.error(error.message) })
  }

  addUserToken(data: {name: string, value: string }) {
    return this.loadByPost('/api/token/add', data)
  }

  editUserToken(data: {name: string, value: string }) {
    return this.loadbyPatch('/api/token/edit', data)
  }

  deleteUserToken(tokenName: string) {
    return this.loadByDelete('/api/token/remove', { name: tokenName })
  }
}

export default new TokenApi()
