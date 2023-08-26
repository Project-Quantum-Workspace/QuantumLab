
import { Button, Tabs } from 'antd';
import React, { useState } from 'react';
import ProjectsTable from './components/ProjectsTable';
import TemplateTable from './components/TemplateTable';


const App: React.FC = () => {
  const [viewP, setViewP] = useState(true);
  const [viewT, setViewT] = useState(false);
  const Onchange = (key: string) => {
    if (key === '1') {
      setViewP(true);
      setViewT(false);
    } else {
      setViewP(false);
      setViewT(true);
    }
  }
  return (
    <>
      {viewP &&
        <>
          <h1 style={{fontSize:"25px"}}>Quantum Workspace</h1>
          <p style={{ color: "rgba(0,0,0,.6)",width:"70%",height:"50px" }}>Manage your projects in Quantum Workspace, utilize built-in templates for create your project,
            or create custom quantum programming environment templates.
          </p>
        </>}
      {viewT &&
        <>
          <h1 style={{fontSize:"25px"}}>Templates</h1>
          <p style={{ color: "rgba(0,0,0,.6)",width:"70%",height:"50px" }}>Quickly create your new workspace from self-defined templates
          </p>
        </>}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end" }}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: 'My Projects',
              key: '1',

            },

            {
              label: 'Templates',
              key: '2',
            },
          ]}
          style={{ width: '200px',fontSize:"20px" }}

          onChange={Onchange}
        />
        <Button type="primary"
          href='/workspace/new'
          style={{
            width: "150px",
            backgroundColor:'#0F56B3',
            marginTop: "8px"
          }}>
          + New Workspace
        </Button>
      </div>
      {viewP && <ProjectsTable data={[]} />}
      {viewT && <TemplateTable/>}

    </>
  );
};

export default App;
