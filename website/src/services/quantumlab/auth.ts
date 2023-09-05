// @ts-ignore
/* eslint-disable */
import { BaseApi } from '@/utils/BaseApi';


/** Get current user GET /api/auth/currentUser */
class AuthApi extends BaseApi {
  currentUser() {
    return this.loadByGet('/api/auth/currUser')
      .then((res) => {
        return res.message ? res.message : res
     })
  }

  login(data: object) {
    return this.loadByPost('/api/auth/login', data, 'json', false)
  }

  logout() {
    return this.loadByPost('/api/auth/logout')
  }
}

export default new AuthApi()
