import { request } from '@umijs/max';

export async function getWorkspace(id: string) {
  return request('http://localhost:8080/api/workspaces/' + id, {
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    
  });
}
