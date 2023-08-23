import { Request, Response} from 'express';

import moment  from 'moment';
type TemplateData = {
    id: number,
    filename: string,
    createdAt: string,
    accessLevel: number,
  
  }

const genTemplateList = (current:number, pageSize:number)=>{
    const tableData: TemplateData[]=[]
    for(let i = 0; i <pageSize;i+=1){
        tableData.push({
            id: i,
            filename: 'AWS Machine Learning Template 1',
            createdAt: "2023-08-10T15:04:05Z",
            accessLevel: 2
        })
    }
    tableData.reverse()
    console.log(tableData)
    return tableData;
}
let wl = genTemplateList(1,2)



export default{
  'GET /api/templates': wl,
}
