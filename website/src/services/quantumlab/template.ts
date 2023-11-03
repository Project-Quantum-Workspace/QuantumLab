import { BaseApi } from '@/utils/BaseApi';
import { TemplateClass, TemplateMetaData } from '@/utils/types/TemplateTypes';
import { request } from '@umijs/max';
class TemplateApi extends BaseApi {
  getAccessibleTemplates() {
    return this.loadByGet('/api/templates')
      .then((res: { message: any; forEach: (arg0: (t: TemplateMetaData) => void) => void; }) => {
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
  postTemplate(template: object | undefined){
    return this.loadByPost('/api/templates',template)
    .then((res: any)=>{
      return res
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