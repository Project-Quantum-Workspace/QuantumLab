import { request } from '@umijs/max';

export async function getWorkspace(id: string) {
  return request('/api/workspaces/' + id, {
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    
  });
}
