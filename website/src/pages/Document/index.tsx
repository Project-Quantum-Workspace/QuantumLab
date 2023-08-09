/* import React from 'react'

export default function index() {
  return (
    <div>
      <h1>Document page</h1>
      <text>Filling...</text>
    </div>
  )
} */

import React from 'react';
import { Card } from 'antd';
import { FontColorsOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <Card title="Card title"
    bordered={true}
    loading={false}
    /* Shows a loading indicator while the 
    contents of the card are being fetchedShows a loading 
    indicator while the contents of the card are being 
    fetched */

    style={{ width: 300, }} >
    <h1 style={{
      color: 'blue',
      fontFamily: 'serif',
    }}>composer</h1>
    <p>Card content</p>
    <button id='click1'>click me to composer</button>
  </Card>

);

export default App;
