import { request } from '@umijs/max';
import { BaseApi } from '@/utils/BaseApi';
import { TemplateClass } from '@/utils/types/TemplateTypes';

class TemplateApi extends BaseApi {
  getTemplate(id: string) {
    return this.loadByGet('/api/templates/'+id)
      .then((res) => {
        return res.message ? res.message : TemplateClass.fromDTO(res)
    })
  }


}
export default new TemplateApi()
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