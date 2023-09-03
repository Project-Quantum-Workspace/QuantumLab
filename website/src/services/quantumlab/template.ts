import { request } from '@umijs/max';



//get all templates that user allowed to access
export async function getAccessibleTemplates(){
    //console.log(id)
    return request('/api/templates',{
      method: 'GET',
      headers: {
        
      },
    })
  }

    //get template by id
export async function getTemplate(id: string) {
  return request('/api/templates/'+id, {
    method: 'GET',
    headers: {
      
    },
  })
}