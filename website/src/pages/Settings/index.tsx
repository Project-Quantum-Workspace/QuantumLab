import {
  Col,
  message,
  Result,
  Row,
} from 'antd';
import { FrownOutlined } from '@ant-design/icons'; 
import { useEffect, useState } from 'react';
import { useIntl } from '@umijs/max';
import { PageLoading } from '@ant-design/pro-components';
import React from 'react';
import AuthApi from '@/services/quantumlab/auth';
import { UserMetaData } from '@/utils/types/UserTypes';
import UserPanel from './components/UserPanel';
import TokenPanel from './components/TokenPanel';

const App = () => {
  const [currUser, setCurrUser] = useState<UserMetaData|undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const intl = useIntl();

  useEffect(() => {
    AuthApi.currentUser().then((res) => {
      setCurrUser(res)
      setLoading(false)
    })
    .catch((error)=> {
      const Errormessage = intl.formatMessage({
        id: 'pages.settings.failure',
        defaultMessage: error.response.data.message,
      });
      message.error(Errormessage);
    })
  }, [])
  if(loading)
    return <PageLoading/>
  return (
    <>
      {currUser ? (
        <>
          <Row gutter={20}>
            <Col span={12}>
              <UserPanel currUser={currUser}/>
            </Col>
            <Col span={12}>
              <TokenPanel quantumlabToken={currUser.quantumlabToken} />
            </Col>
          </Row>
          </>
      ) : (
        <Result
        icon={<FrownOutlined />}
        title="User Not Found"
      />
      ) }
    </>
  );
};

export default App;
