import { request } from '@umijs/max';

//get all templates
export async function getAllTemplates(){
    //console.log(id)
    return request('/api/templates',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        
      }
    })
  }
  //get all templates that user allowed to access
export async function getAccessibleTemplates(){
    //console.log(id)
    return request('/api/templates',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
      }
    })
  }

    //get template by id
export async function getTemplate(id: string) {
  return request('/api/templates/'+id, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  })
}