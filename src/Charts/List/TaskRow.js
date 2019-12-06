import React from 'react';
 
const getStatusColor = statusName => {
    let statusColor = null
    switch (statusName) {
    case "done":
        statusColor = "rgb(139, 204, 143)";
        break;
    case "to do":
        statusColor = "rgb(204, 139, 139)";
        break;
    case "in progress":
        statusColor = "rgb(242, 238, 153)";
        break;
    default:
        statusColor = "transparent";
    }

    return {backgroundColor: statusColor};

}

const TaskRow = props => {

    const {id, complexName, start, end, status, resources, percentComplete} = props.task;

    const resource = resources.length ? resources[0].resource.name : "-";
    
    return (<tr onDoubleClick={()=>props.activateTaskForm(id)}>
        <td>{props.index + 1}</td>
        <td>{complexName.join(" / ")}</td>
        <td>{start.substring(0,10)}</td>
        <td>{end.substring(0,10)}</td>
        <td style={getStatusColor(status)}>{status}</td>
        <td style={{cursor: "default"}} onMouseOver={ev=>{ props.activateToolTip(ev,id);}} onMouseOut={props.disactivateToolTip}>{resource + (resources.length > 1 ? " ..." : "")}</td>
<td onDoubleClick={ev => ev.stopPropagation()}>{percentComplete}</td>
    </tr>);
}
 
export default TaskRow;