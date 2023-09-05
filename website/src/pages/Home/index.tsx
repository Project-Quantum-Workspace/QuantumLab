import React, { Component } from 'react'
import  {SmallCard, StyledContainer} from './HomeComponent/LPComponent'
import CircularLoading from './HomeComponent/Circular/CircularLoading'
import { useModel } from '@umijs/max'


const Home: React.FC =()=>{
  const {initialState} = useModel('@@initialState')
  return(
    <div>
      <h1>Hello, {initialState?.currentUser?.firstName}</h1>
      <StyledContainer>
      <SmallCard
      index={1}
      src="/composer"
      title="Composer"
      desc="Design Graphical Circuit with"
      btName='Launch'
      img = "c"
      />
      <SmallCard
      index={1}
      src="/workspace"
      title="Workspace"
      desc="Build quantum program in"
      btName='View Last'
      img = 'w'
      />
     
      </StyledContainer>
      <StyledContainer>
     
      <SmallCard
      index={1}
      src="/jobmonitor"
      title="Job Monitor"
      desc="Monitor Your Current Works"
      btName='Create'
      img = '0'
      />
      </StyledContainer>
      
    </div>
  )
}

export default Home;