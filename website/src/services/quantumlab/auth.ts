import { BaseApi } from '@/utils/BaseApi';
import { UserMetaData } from '@/utils/types/UserTypes';

/** Get current user GET /api/auth/currentUser */
class AuthApi extends BaseApi {
  currentUser() {
    return this.loadByGet('/api/auth/currUser')
      .then((res) => {
        return res as UserMetaData
     })
  }

  login(data: object) {
    return this.loadByPost('/api/auth/login', data, 'json', false)
  }

  logout() {
    return this.loadByPost('/api/auth/logout')
  }

  userUpdateInfo(data: UserMetaData) {
    return this.loadbyPut('/api/admin/users/' + data.id, data)
      .then((res) => res)
  }
}

export default new AuthApi()
