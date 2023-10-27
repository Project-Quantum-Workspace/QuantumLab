import {
  Form,
  Input,
  message,
  Modal,
  Select,
} from 'antd';
import { useEffect, useState } from 'react';
import TokenApi from '@/services/quantumlab/token';

type TokenModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  isEditing?: boolean;
  tokenName?: string;
  tokenValue?: string;
}

const TokenModal = (props: TokenModalProps) => {
  const { TextArea } = Input;
  const [form] = Form.useForm()
  const { isOpen, setIsOpen, setReload, title, isEditing, tokenName, tokenValue } = props
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);

  const handleConfirm = () => {
    const formData = form.getFieldsValue()
    if (isEditing) { //edit token
      TokenApi.editUserToken(formData).then((res) => {
        setReload(true)
        message.success(res.message)
      })
      .catch((error) => { message.error(error.response.data.message) })
    } else { // create new token
      TokenApi.addUserToken(formData).then((res) => {
        setReload(true)
        message.success(res.message)
      })
      .catch((error) => { message.error(error.response.data.message) })
    }
    setIsOpen(false);
  }

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <>
      <Modal 
        title={title}
        open={isOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText='Confirm'
        okButtonProps={{ disabled: !submittable }}
      >
        <Form 
          form={form}
          autoComplete="off" 
          initialValues={{ name: tokenName??null, value: tokenValue??null }}
          >
          <Form.Item 
            label="Token Name"
            name='name'
            rules={[{ required: true, message: 'Please select token name!' }]}>
            <Select>
              <Select.Option value="IBM">IBM</Select.Option>
              <Select.Option value="BRAKET">BRAKET</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Token Value"
            name='value'
            rules={[{ required: true, message: 'Please input token value!' }]}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </> 
  )
}

export default TokenModal