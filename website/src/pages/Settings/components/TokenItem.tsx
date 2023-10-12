import {
  Button,
  Card,
  Col,
  Typography,
  message,
  Row,
  Popconfirm
} from 'antd';
import { DeleteOutlined, EditOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TokenModal from './TokenModal';
import TokenApi from '@/services/quantumlab/token';

type TokenItemProps = {
  tokenName: string;
  tokenValue: string;
  readonly?: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenItem = (props: TokenItemProps) => {
  const { tokenName, tokenValue, readonly, setReload } = props;
  const { Paragraph } = Typography;
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleDelete = () => {
    TokenApi.deleteUserToken(tokenName).then((res) => {
      setReload(true)
      message.success(res.message)
    })
    .catch((error) => { message.error(error.response.data.message) })
  };

  return (
    <>
      <Card 
        key={tokenName+'-'+tokenValue}
        title={tokenName}
        headStyle={{ borderBlockColor: '#BABABA' }}
        style={{ marginBlock: '1rem', backgroundColor: '#EFEFEF' }}
        size='small'>
        <Row>
          <Col span={1}>
            {readonly ? <LockOutlined />: <KeyOutlined />}
          </Col>
          <Col span={19}>
            <Paragraph ellipsis>{tokenValue}</Paragraph>
          </Col>
          <Col span={4}>
            {readonly ? null : (
              <div>
                <Button type='text' icon={<EditOutlined />} onClick={handleEdit} />
                <Popconfirm
                  title="Delete User Token"
                  description={"You are trying to delete token " + tokenName+'!'}
                  onConfirm={handleDelete}
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <Button type='text' icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            )}
          </Col>
        </Row>
      </Card>
      <TokenModal 
        title='Update Token'
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        isEditing
        tokenName={tokenName}
        tokenValue={tokenValue}
        setReload={setReload}
      />
    </>
    
  )
}

export default TokenItem