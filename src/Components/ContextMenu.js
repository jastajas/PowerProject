import React from 'react';
import './ContextMenu.css';


const ContextMenu = props => {
 
    const position = {
        top: props.contextMenu.positionY,
        left: props.contextMenu.positionX
      }

    return ( <ul className="buttonSetContex flexColumnCenter" style={position}> 
                <li><button type="button" onClick={() => props.downloadXmlFile(false)}>download all tasks</button></li>
                <li><button type="button" onClick={() => props.downloadXmlFile(true)} >dowload filterd tasks</button></li>
                <li><button type="button" onClick={() => alert("work in progress")} >print</button></li>
            </ul> );
}
 
export default ContextMenu;