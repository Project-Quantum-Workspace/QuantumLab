import { PageContainer } from '@ant-design/pro-components';
import { Card,theme } from 'antd';

/****
 * padding card of landing page
 */

const InfoCard: React.FC<{
    title:string;
    index:number;
    desc:string;
    href:string;
}>=({title, href,index,desc})=>{
    const {useToken} = theme;
    const {token} = useToken();

    return(
    <div
    
    >

    </div>);
}