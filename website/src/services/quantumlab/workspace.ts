import { request } from '@umijs/max';
import { BaseApi } from '@/utils/BaseApi';
import { WorkspaceInfoClass } from '@/utils/types/WorkspaceTypes';

class WorkspaceApi extends BaseApi {
  getWorkspace(id: string) {
    return this.loadByGet('/api/workspaces/' + id).then((res) => {
      return res.message ? res.message : WorkspaceInfoClass.fromDTO(res);
    });
  }

  // getAllWorkspace(id:string) {
  //   return this.loadByGet('/api/workspaces/users/'+id)
  //     .then((workspaces) =>  workspaces)
  // }
}

export default new WorkspaceApi();

//get all workspace by user id
export async function getAllWorkspace(id: string) {
  //console.log(id)
  return request('/api/workspaces/users/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
