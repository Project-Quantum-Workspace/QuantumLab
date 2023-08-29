import { request } from '@umijs/max';
const token = localStorage.getItem('token')

export async function getWorkspace(id: string) {
  return request('/api/workspaces/' + id, {
    method: 'GET',
    headers: {
       Authorization: `Bearer ${token}`,
     },
    
  });
}


//get all workspace by user id
export async function getAllWorkspace(id:string){
  //console.log(id)
  return request('/api/workspaces/users/'+id,{
    method: 'GET',
    headers:{
      Authorization: `Bearer ${token}`,
      
    }
  })
}
