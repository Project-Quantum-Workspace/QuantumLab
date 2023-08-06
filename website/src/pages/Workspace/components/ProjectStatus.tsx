import React from 'react';
import { StatusType } from '../utils/types/projectItemTypes';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { CaretRightFilled, CloudFilled, LoadingOutlined, PauseCircleFilled, WarningFilled } from '@ant-design/icons';

import styled from 'styled-components';

interface StatusProps {
  status: StatusType | undefined;
  margin:boolean
}
const StyledT = styled.p`
margin-left: 6px;
margin-bottom: 2px;

`
const ProjectStatus = (props: StatusProps) => {
  const status = props.status;
  let iconType = null;
  let labelColor = '';
  

  switch (status) {
    case StatusType.Running:
      iconType = <CaretRightFilled />;
      labelColor = '#2AB930';
      break;
    case StatusType.Stopped:
      iconType = <PauseCircleFilled/>;
      labelColor = '#818181';
      break;
    case StatusType.Pending:
      iconType = <LoadingOutlined/>;
      labelColor = '#ED9526';
      break;
    case StatusType.Failed:
      iconType = <WarningFilled/>;
      labelColor = '#B9332A';
      break;
    case StatusType.Connecting:
      iconType = <CloudFilled />;
      labelColor = '#1672EC';
      break;
  }
 
  const statusLabelClass = useEmotionCss(() => {
    return {
     // fontFamily: 'Manrope',
      fontSize: '15px!important',
      fontStyle: 'normal',
      fontWeight: '600!important',

      lineHeight: '24px!important', /* 150% */
      letterSpacing: '0.08px',
    };
  });
  return (

    <div  className={statusLabelClass} 
    style={{
      display:'flex',
      flexDirection:'row',
      color:labelColor,
      marginBottom: props.margin?'0.5em':'0em'
      }} >
      {iconType}
      <StyledT>{status}</StyledT>
    </div>


  );
};

export default ProjectStatus;