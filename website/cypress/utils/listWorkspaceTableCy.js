const { defaultTemplate } = require('./listTemplateTableCy');

const statusValue = ['Stopped', 'Pending', 'Running', 'Failed', 'Connecting'];

const genWorkspaceList = (current, pageSize) => {
  const tableData = [];

  const getRandomDate = (start, end) => {
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

function getAllWorkspace(req, res, u) {
  return wl;
}

// Export the mock data and the endpoint to be intercepted
export const workspaceMockEndpoint = '/api/workspaces/users/1*';
export const workspaceMockData = wl;

// If you were using Cypress in your TypeScript version, you might use it in JavaScript as:
// cy.intercept('GET', workspaceMockEndpoint, workspaceMockData).as('getWorkspaces');
