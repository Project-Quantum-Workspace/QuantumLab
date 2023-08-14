import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name ProLayoutProps configuration
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // Day break blue
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  // https://procomponents.ant.design/components/layout#prolayout
  // defaultCollapsed: true,
  // breakpoint: false,
  title: 'QuantumLab',
  pwa: true,
  logo: '/icons/logo.svg',
  iconfontUrl: '',
  token: {
    // Refer to the TS declaration, demo in the document, and modify the style through token
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
