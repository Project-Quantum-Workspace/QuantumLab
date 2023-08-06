import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import React from 'react';
import RunningIcon from '~/assets/running.svg';
import StoppedIcon from '~/assets/stopped.svg';
import PendingIcon from '~/assets/pending.svg';
import FailedIcon from '~/assets/failed.svg';
import ConnectingIcon from '~/assets/connecting.svg';
import './ProjectStatus.css';

import { StatusType } from '../utils/types/projectItemTypes';

interface StatusProps {
  status: StatusType;
}
const ProjectStatus = (props: StatusProps) => {
  const status = props.status;
  let iconType = '';
  let labelColor = '';

  switch (status) {
    case StatusType.Running:
      iconType = RunningIcon;
      labelColor = '#2AB930';
      break;
    case StatusType.Stopped:
      iconType = StoppedIcon;
      labelColor = '#818181';
      break;
    case StatusType.Pending:
      iconType = PendingIcon;
      labelColor = '#ED9526';
      break;
    case StatusType.Failed:
      iconType = FailedIcon;
      labelColor = '#B9332A';
      break;
    case StatusType.Connecting:
      iconType = ConnectingIcon;
      labelColor = '#1672EC';
      break;
  }

  return (
    <IonItem lines="none" className="status-item">
      <IonGrid>
        <IonRow class="ion-align-items-center">
          <IonCol size="auto">
            <img className="status-icon" src={iconType} />
          </IonCol>
          <IonCol size="auto">
            <IonLabel style={{ color: labelColor }}>{status}</IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default ProjectStatus;
