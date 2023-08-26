import PropTypes from 'prop-types'
import React, { Component } from 'react'

interface WorkspaceData{
    name:string;
    dateCreated:string;
    lastAccessed:string;
    template:string;
    status:string;
    tags:string[];
    
  }
export class myProject extends Component {
  static propTypes = {}

  render() {
    return (
      <div>myProject</div>
    )
  }
}

export default myProject