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
  