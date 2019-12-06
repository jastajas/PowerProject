import React from 'react';
import User from "../images/user.svg";
import "./ToolTipResource.css";

const ToolTipResource = props => {
const {resources} = props;

    const taskOwners = resources.slice(1, resources.length).map(resource => (
        <>
        <div className="resourceElement" key={resource.resource.id}>
          <img src={User} alt="" /> <p>{resource.resource.name}</p>
        </div>
        </>
      ));
    
      const position = {
        top: props.yPosition,
        left: props.xPosition,

      }

    return ( <div style={position} className="toolTipResource">
    {taskOwners}
    </div> );
}
 
export default ToolTipResource;
