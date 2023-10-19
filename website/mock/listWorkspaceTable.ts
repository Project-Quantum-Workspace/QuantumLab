import { TemplateMetaData } from '@/utils/types/TemplateTypes';
import { Request, Response } from 'express';

// import moment from 'moment';
import { defaultTemplate } from './listTemplateTable';

type WorkspaceInfoMetaData = {
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
};
const statusValue = ['Stopped', 'Pending', 'Running', 'Failed', 'Connecting'];

const genWorkspaceList = (current: number, pageSize: number) => {
  const tableData: WorkspaceInfoMetaData[] = [];

  const getRandomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const startDate = new Date(2023, 0, 1); // starting from 1st January 2023
  const endDate = new Date(); // today's date as the upper limit

  for (let i = 0; i < pageSize; i += 1) {
    const createdAt = getRandomDate(startDate, endDate);
    const lastAccessed = getRandomDate(createdAt, endDate);
    const updatedAt = getRandomDate(createdAt, lastAccessed);

    tableData.push({
      id: i,
      name: 'AWS Example Project',
      createdAt: createdAt.toISOString(),
      lastAccessed: lastAccessed.toISOString(),
      updatedAt: updatedAt.toISOString(),
      description: 'this is an example project',
      templateId: 1,
      state: statusValue[i],
      parameters: '{"Disk Size": "50G", "Available Zone": "qh2-uom"}',
      tags: 'CPU, Qiskit',
      template: defaultTemplate(1),
    });
  }
  tableData.reverse();
  return tableData;
};

let wl = genWorkspaceList(1, 5);

function getAllWorkspace(req: Request, res: Response, u: string) {
  return wl;
}

export default {
  'GET /api/workspaces/users/1': wl,
};
