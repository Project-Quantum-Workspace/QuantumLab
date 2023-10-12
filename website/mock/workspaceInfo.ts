import { Request, Response } from 'express';
import moment from "moment/moment";
import {defaultTemplate} from "./listTemplateTable";
import { WorkspaceInfoMetaData } from '@/utils/types/WorkspaceTypes';


const stutusValue = ['Stopped', 'Pending', 'Running', 'Failed', 'Connecting']
const WorkspaceInfoData: WorkspaceInfoMetaData={
  id: 1,
  // icon: string;
  name: 'AWS Example Project',
  createdAt: "2023-08-10T15:04:05Z",
  lastAccessed: moment().format('YYYY-MM-DD'),
  updatedAt: moment().format('YYYY-MM-DD'),
  description: "this is an example project",
  templateId: 1,
  state: stutusValue[1],
  parameters: '{"Disk Size": "50G", "Available Zone": "qh2-uom"}',
  tags: 'CPU, Qiskit',
  template:defaultTemplate(1)
}

export default {
  'GET /api/workspace/Info': async (req: Request, res: Response) => {
    res.send(WorkspaceInfoData);
  },
};
