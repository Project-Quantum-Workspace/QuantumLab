import { request } from '@umijs/max';

const token = localStorage.getItem('token')

//get all templates that user allowed to access
export async function getAccessibleTemplates(){
    //console.log(id)
    return request('/api/templates',{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

    //get template by id
export async function getTemplate(id: string) {
  return request('/api/templates/'+id, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}