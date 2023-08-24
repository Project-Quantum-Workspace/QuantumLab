import { TemplateMetaData } from '@/pages/Workspace/utils/types/TemplateTypes';
import { Request, Response} from 'express';

import moment  from 'moment';


type WorkspaceInfoMetaData={
  id?: number;
  name?: string;
  createdAt?: string;
  lastAccessed?: string;
  updatedAt?: string;
  description?: string;
  templateId?: number;
  template?: TemplateMetaData;
  state?: string;
  tags?: string;
  type?: string;
  parameters?: string;
  message?: string;
}
const stutusValue = ['Stopped', 'Pending', 'Running', 'Failed', 'Connecting']
const genWorkspaceList = (current:number, pageSize:number)=>{
    const tableData: WorkspaceInfoMetaData[]=[]
    for(let i = 0; i <pageSize;i+=1){
        tableData.push({
            id: i,
            // icon: string;
            name: 'AWS Example Project',
            createdAt: "2023-08-10T15:04:05Z",
            lastAccessed: moment().format('YYYY-MM-DD'),
            updatedAt: moment().format('YYYY-MM-DD'),
            description: "this is an example project",
            templateId: 1,
            state: stutusValue[i],
            parameters: '{"Disk Size": "50G", "Available Zone": "qh2-uom"}',
            tags: 'CPU, Qiskit',
  
        })
    }
    tableData.reverse()
    return tableData;
}
let wl = genWorkspaceList(1,5)
function getAllWorkspace(req:Request,res:Response,u:string){
  return wl
}


export default{
  'GET /api/workspaces/users/:id': wl,
}
