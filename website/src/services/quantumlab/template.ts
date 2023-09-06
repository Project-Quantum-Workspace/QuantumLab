import { BaseApi } from '@/utils/BaseApi';
import { TemplateClass, TemplateMetaData } from '@/utils/types/TemplateTypes';
import { request } from '@umijs/max';
class TemplateApi extends BaseApi {

  getAccessibleTemplates() {
    return this.loadByGet('/api/templates')
      .then((res) => {
        if(!res.message) {
          let templates: TemplateClass[] = []
          res.forEach((t: TemplateMetaData) => {
            templates.push(TemplateClass.fromDTO(t))
          })
          return templates
        }
        return res.message
      })
  }

}
export default new TemplateApi()

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