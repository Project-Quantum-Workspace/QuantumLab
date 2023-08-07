import {Button } from 'antd';
import styled from "styled-components";
import ComposerPNG from "../../../../public/icons/Composer.png";
import WorkspacePNG from "../../../../public/icons/Rectangle 57.png"
import CircularLoading from './Circular/CircularLoading';
/****
 * padding card of landing page
 */

const StyledCard = styled.div`
flex: 1;
background-color:rgb(255, 255, 255);
box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 1px 1px;
border-radius: 8px;
font-size: 18px;
max-width:350px;
line-height: 22px;
padding: 16px 19px;
display: flex;
margin-right:2%;
flex-direction: column;
gap: 1%;
@media(max-width:600px){
    margin-right:0px;
    margin-top:2%;
    max-width:80%;

    
}
&:hover{
    transform:scale(1.05)
}
`;
export const StyledContainer = styled.div`
    display: flex;
    flex-direction:row;
    margin-bottom:2%;
    @media(max-width:600px){
        margin-left:10%;
        max-width:100%;
        flex-direction:column;
    }

`;

const StyledTitle = styled.p`
@media(max-width:600px){
    margin-left:10%;
    max-width:100%;
    flex-direction:column;
}

`;
const StyledImg = styled.img`
    width:50px;
    height:50px;
    margin-bottom:1%
`;

export const SmallCard: React.FC<{
    title:string;
    index:number;
    desc:string;
    href:string;
    btName:string;
    img:string;
}>=({title, href,index,desc,btName,img})=>{
   
    return(

        <StyledCard>
            {img=='c'&&<StyledImg src={ComposerPNG} style={{width:"60px"}}/>}
            {img=='w'&&<StyledImg src={WorkspacePNG}/>}
           
            <p>{desc}</p>
            <h1>{title}</h1> 
            {img=='0'&&<CircularLoading totalTask={6}/>}
            <Button
            type='primary'
            style={{
                maxWidth:'100px',
                backgroundColor: '#0F56B3',
                alignItems:'center',
                fontSize:"15px",
                marginTop:"2%",
                marginBottom:"1%"
                
                
            }}
            href={href}
            block
            >
               {btName}
            </Button>
        </StyledCard>
   );
}
export const LargeCard=()=>{

}