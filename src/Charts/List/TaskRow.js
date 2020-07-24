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

    const {id, start, finish, status, assignments, percentComplete, selected, outlineLevel, outlineNumber, name} = props.task;

    const indentation = {paddingLeft: (outlineLevel-1)*20}
    // const complexName = outlineLevel > 1 ? [...props.taksNameGenrator(outlineNumber), name] : [name];

    const resource = assignments.length ? assignments[0].resource.name : "-";

    return (<tr onDoubleClick={() => props.activateTaskForm(id)}>
        <td>{outlineNumber}</td>
        <td style={indentation}>{name}</td>
        <td>{start.substring(0, 10)}</td>
        <td>{finish.substring(0, 10)}</td>
        <td style={getStatusColor(status)}>{status}</td>
        <td style={{cursor: "default"}} onMouseOver={ev => {props.activateToolTip(ev, id);}}
                                        onMouseOut={props.disactivateToolTip}>{resource + (assignments.length > 1 ? " ..." : "")}</td>
        <td onDoubleClick={ev => ev.stopPropagation()}>{percentComplete}</td>
        <td><input type="checkbox" checked={selected} onChange={ev=>props.handleTaskSelect(ev,id)}/></td>
    </tr>);
}

export default TaskRow;
