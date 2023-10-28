
import { Form, Input, InputNumber, Select } from 'antd';
import React, { Component, useState } from 'react'
import { JsonData } from '..';

type Props = {
  data: JsonData
}
const InputStyle = {
  marginTop: "10px"
}
export const TemplateCol = (props: Props) => {
  const data = props.data
  var options:Array<{name: string,label: string}>= []
  if(data.selections){
    
    data.selections.forEach((e)=>{
      
      options.push({name: e.name,label: e.name})
    })
  }
  
  return <>
    <Form.Item
      labelCol={{ flex: '30%' }}
      wrapperCol={{ span: '30%' }}
      label={data.name}
      name={data.name}
      extra={data.description}
    >
      {data.isInput?<InputNumber defaultValue={data.default}/>:
      <Select style={InputStyle} defaultValue={data.default} options={options} 
  

      />}
    </Form.Item>
   
  </>
}

