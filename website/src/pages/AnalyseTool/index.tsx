import React, { useEffect } from 'react'
import { Typography } from 'antd'
const { Paragraph, Link } = Typography;

const AnalyseTool: React.FC =()=>{
  useEffect(() => {
    window.location.reload()
  })
  return(
    <div>
      <h3>You will be redirected to Superset in a few seconds...</h3>
      <Paragraph>If it does not work, please click <Link href="/api/redirect/superset">here</Link> to try again.</Paragraph> 
    </div>
  )
}

export default AnalyseTool;