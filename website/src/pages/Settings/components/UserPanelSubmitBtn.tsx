import {
  Button,
  Form,
  Modal
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import type { FormInstance } from 'antd';


const { confirm } = Modal;

type SubmitButtonProps = {
  form: FormInstance,
  onConfirm: () => void
}

const SubmitButton = (props: SubmitButtonProps) => {
  const [submittable, setSubmittable] = useState(false);
  const { form, onConfirm } = props
  const values = Form.useWatch([], form);

  const SubmitBtnClass = useEmotionCss(() => {
    return {
      borderRadius: '4px',
      backgroundColor:'#0F56B3',
      boxShadow: '0px 4px 8px 0px rgba(41, 121, 255, 0.20), 0px 2px 4px 0px rgba(27, 78, 163, 0.20)',
      color: '#F5F8FF',
      textAlign: 'center',
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontWeight: '500!important',
      fontSize: '24px!important',
      lineHeight: '0%',
      padding: '0px 16px',
      marginBottom: '1rem'
    };
    
  });

  const showConfirm = () => {
    confirm({
      title: 'Request Changes',
      icon: <ExclamationCircleFilled />,
      content: 'You are updating your personal information, do you want to continue?',
      onOk: onConfirm,
      okText: 'Confirm'
    });
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
    <Button className={SubmitBtnClass} onClick={showConfirm} disabled={!submittable}>
      Update
    </Button>
  );
};
export default SubmitButton