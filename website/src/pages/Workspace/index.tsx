
import { Button } from 'antd';
import React, { useState } from 'react';
import MyProject from './components/ProjectsTable';


const App: React.FC = () => {
 
  return (
    <>
    <h1>Quantum Workspace</h1>
    <p style={{color:"rgba(0,0,0,.6)"}}>Manage your projects in Quantum Workspace, utilize built-in templates for create your project,
       or create custom quantum programming environment templates.
       </p>
      
        <Button type="primary"
         href='/workspace/new'
         style={{
          width:"200px"
         }}>
          Go to Workspace
          </Button>
          <MyProject/>
      
    </>
  );
};

export default App;
