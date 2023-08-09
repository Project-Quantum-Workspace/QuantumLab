import React, { Component } from 'react'
import SmallCard, { StyledContainer } from './LPComponent'
import { Card } from 'antd';

const Home = () => {
  return (
    
    <div> 
      <h1>Hello, Lois</h1>
      <StyledContainer>
        <SmallCard
          index={1}
          href="/workspace"
          title="Composer"
          desc="Design Graphical Circuit with"
          btName='Launch'
          img="c"
        />
        <SmallCard
          index={1}
          href="/workspace"
          title="Workspace"
          desc="Build quantum program in"
          btName='View Last'
          img='w'
        />
      </StyledContainer>
      <StyledContainer>
        <SmallCard
          index={1}
          href="/workspace"
          title="Job Monitor"
          desc="Building quantum program in"
          btName='Create'
          img='0'
        />
      </StyledContainer>
    </div>
  )
}

export default Home;