import moment from 'moment/moment';
import { defaultTemplate } from './listTemplateTableCy';

const statusValue = ['Stopped', 'Pending', 'Running', 'Failed', 'Connecting'];
const WorkspaceInfoData = {
  id: 1,
  // icon: string;
  name: 'AWS Example Project',
  createdAt: '2023-08-10T15:04:05Z',
  lastAccessed: moment().format('YYYY-MM-DD'),
  updatedAt: moment().format('YYYY-MM-DD'),
  description: 'this is an example project',
  templateId: 1,
  state: statusValue[1],
  parameters: '{"Disk Size": "50G", "Available Zone": "qh2-uom"}',
  tags: 'CPU, Qiskit',
  template: defaultTemplate(1),
};

export default {
  'GET /api/workspace/Info': async (req, res) => {
    res.send(WorkspaceInfoData);
  },
};

export const workspaceInfoUrl = '/api/workspace/Info*';
export const workspaceInfoData = WorkspaceInfoData;
