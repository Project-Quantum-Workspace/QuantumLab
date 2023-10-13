import {
  Button,
  Card,
  Empty,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import TokenItem from './TokenItem';
import TokenModal from './TokenModal';
import { UserTokenType } from '@/utils/types/UserTypes';
import TokenApi from '@/services/quantumlab/token';

type TokenPanelProps = {
  quantumlabToken: string,
}

const TokenPanel = (props: TokenPanelProps) => {
  const { Title, Paragraph } = Typography;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);
  const { quantumlabToken } = props
  const [ userToken, setUserToken ] = useState<UserTokenType[]|[]>([])

  const CreateBtnClass = useEmotionCss(() => {
    return {
      borderRadius: '4px',
      backgroundColor:'#0F56B3',
      boxShadow: '0px 4px 8px 0px rgba(41, 121, 255, 0.20), 0px 2px 4px 0px rgba(27, 78, 163, 0.20)',
      color: '#F5F8FF',
      textAlign: 'center',
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontWeight: '500!important',
      fontSize: '20px!important',
      lineHeight: '0%',
      padding: '0px 16px',
    };
  });

  useEffect(() => {
    if(reload) {
      TokenApi.getUserToken().then((res) => {
        if (res)
          setUserToken(res)
      })
      setReload(false)
    }
  }, [reload])

  return (
    <>
      <Card title="Token Panel" 
        bordered={false} 
        style={{ height: '40rem', overflow: 'auto' }}
        headStyle={{ fontSize: '25px', fontFamily: 'Manrope', fontWeight: '600' }} 
      >
        <Title level={4}>QuantumLab Token</Title>
        <Paragraph>Other Preferences</Paragraph>
        <TokenItem tokenName='Quantum Lab' tokenValue={quantumlabToken}
        setReload={setReload} readonly/>

        <Title level={4}>User Token</Title>
        <Paragraph>Other Preferences</Paragraph>
        <Button className={CreateBtnClass} onClick={() => setIsCreateModalOpen(true)}>Create New</Button>
        {userToken?.length ? (userToken.map((token) => <TokenItem 
          key={`${token.name}-${token.value}`}
          tokenName={token.name}
          tokenValue={token.value}
          setReload={setReload}
          />
        )) : ( 
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} 
          description={
            <span>
              You have not set any token yet.
            </span>
          }
        />)}
      </Card>
      <TokenModal 
        title='Update Token'
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        setReload={setReload}
      />
    </>
  )
}

export default TokenPanel