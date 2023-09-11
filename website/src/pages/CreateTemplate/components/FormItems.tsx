
import { Form, Input } from 'antd';
import React, { Component } from 'react'
import { FileJson } from '..';

type Props={
    data: FileJson
}
export const TemplateCol = (props:Props)=>{
  return<>
  <Form.Item name="test" label="Test" >
    <Input/>
  </Form.Item>
  <Form.Item name="test2" label="Test2" >
    <Input/>
  </Form.Item>
  </>
}

