import { BaseApi } from '@/utils/BaseApi';
import { WorkspaceInfoClass } from '@/utils/types/WorkspaceTypes';
import { ToolsetMetaData, ToolsetClass } from '@/utils/types/ToolsetTypes';
import { message } from 'antd';

class WorkspaceApi extends BaseApi {
  getWorkspace(id: string) {
    return this.loadByGet('/api/workspaces/' + id).then((res) => {
      return res.message ? res.message : WorkspaceInfoClass.fromDTO(res);
    });
  }

  getAllWorkspace(id:string) {
    return this.loadByGet('/api/workspaces/users/'+id)
      .then((workspaces) =>  workspaces)
  }

  getWorksapceToolset(id:string) {
    return this.loadByGet('/api/workspaces/' + id + '/toolset')
      .then((res) => {
        if(Array.isArray(res)) {
          let toolset: ToolsetClass[] = []
          res.forEach((t: ToolsetMetaData) => {
            toolset.push(ToolsetClass.fromDTO(t))
          })
          return toolset
        }
      })
      .catch((error) => { message.error(error.message) })
  }

}

export default new WorkspaceApi();
