import "./circularStyle.css"
import * as React from 'react'

interface LoadingInput{
    totalTask:number;
}
const CircularLoading=(props:LoadingInput)=>{
    const num = props.totalTask;
    const renderBlocks = () => {
        return Array.from({ length: 36 }, (_, index) => (
          <div key={index} className="block" 
          style={{ animationDelay: `${index * 0.025}s`,
          transform: `rotate(${6.2 * index+250}deg)`
        }}/>
        ));
      }
    
    return(
        <div>
            <div className="rating">
                <h2>{num}</h2>
                {renderBlocks()}
                
            </div>
        </div>
       
    )
}

export default CircularLoading