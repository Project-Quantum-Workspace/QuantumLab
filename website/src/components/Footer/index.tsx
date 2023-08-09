import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Quantum Workspace',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        opacity: '90%',
        
        position: 'relative',

      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'QuantumLab',
          title: 'QuantumLab',
          href: 'https://github.com/Project-Quantum-Workspace/QuantumLab',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Project-Quantum-Workspace/QuantumLab',
          blankTarget: true,
        },
        {
          key: 'Ant Design Pro',
          title: 'Built With Ant Design',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
