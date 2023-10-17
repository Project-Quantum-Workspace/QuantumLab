import { ConfigProvider, Result } from "antd"
import { CarOutlined } from "@ant-design/icons"

const TODO = () => {
  return (
    <ConfigProvider
    theme={{
      components: {
        Result: {
          iconFontSize: 90,
          titleFontSize: 30,
          subtitleFontSize: 20
        }
      },
    }}
  >
    <Result
      icon={<CarOutlined />}
      title="COMING SOON"
      subTitle='This page is under construction'
    />
  </ConfigProvider>
  )
}
export default TODO