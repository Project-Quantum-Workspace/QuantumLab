/* import React from 'react'

export default function index() {
  return (
    <div>
      <h1>Document page</h1>
      <text>Filling...</text>
    </div>
  )
} */
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import {useNavigate, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/composer");
  };

  return (
    <div>
      <Card title="Card title"
        bordered={true}
        loading={false}
        style={{ width: 300, }} >
        <h1 style={{
          color: 'blue',
          fontFamily: 'serif',
        }}>composer</h1>
        <p>Card content</p>
        <button onClick={handleNavigation}>to composer </button>  
      </Card>
    </div>

  );
}


export default App;
