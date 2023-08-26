import React, { Component } from 'react'
import  {SmallCard, StyledContainer} from './HomeComponent/LPComponent'
import CircularLoading from './HomeComponent/Circular/CircularLoading'


const Home =()=>{
  return(
    <div>
      <h1>Hello, Lois</h1>
      <StyledContainer>
      <SmallCard
      index={1}
      href="/workspace"
      title="Composer"
      desc="Design Graphical Circuit with"
      btName='Launch'
      img = "c"
      />
      <SmallCard
      index={1}
      href="/workspace"
      title="Workspace"
      desc="Build quantum program in"
      btName='View Last'
      img = 'w'
      />
     
      </StyledContainer>
      <StyledContainer>
     
      <SmallCard
      index={1}
      href="/workspace"
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