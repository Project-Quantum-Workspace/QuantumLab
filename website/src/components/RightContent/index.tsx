import { CommentOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import React from 'react';

export type SiderTheme = 'light' | 'dark';

/* export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
}; */

export const Feedback = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://feedback.quantumlab.cloud');
      }}
    >
      <CommentOutlined />
    </div>
  );
};

export const Search = () => {
  return (
    <div style={{
      paddingRight: 30,
      backgroundColor:'white',
      fontSize: 16,
      display: 'flex',
      alignItems: 'center',
      lineHeight:1.5,

}}>
  <input placeholder="Searching" />
    </div >


  );
};
