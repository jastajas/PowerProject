import React from "react";
import "./KanbanTail.css";
import User from "../../images/user.svg";

const getBorderStyle = status =>{

  let statusColor = null
    
  switch (status) {
  case "done":
      statusColor = "rgb(114, 161, 118)";
      break;
  case "to do":
      statusColor = "rgb(138, 60, 60)";
      break;
  case "in progress":
      statusColor = "rgb(218, 206, 144)";
      break;
  default:
      statusColor = "transparent";
  }

   return {borderLeft: `solid ${statusColor} 10px`};

}

const KanbanTail = props => {
  const {assignments, start, finish, status, id, outlineNumber, outlineLevel, name} = props.task;

  const complexName = outlineLevel > 1 ? [...props.taskNameGenerator(outlineNumber), name] : [name];

  const borderStyle = getBorderStyle(status);


    const taskOwners = assignments.length ? (
        <div key={assignments[0].id} className="taskOwner" onMouseOver={ev => props.activateToolTip(ev, id)} onMouseOut={props.disactivateToolTip}>
            <img src={User} alt="" /> <p>{assignments[0].resource.name}</p> {assignments.length > 1 && (<p> ...</p>)}
        </div>) : (<p>-</p>);

  const taskName = complexName.map((name, index) => (<p key={index}>{name}</p>));

  return (
    <div className="kanbanTail" style={borderStyle}>
      <h5>{taskName}</h5>
      <div>{taskOwners}</div>
      <div>
        <p>
          Start Date:{" "}
          {start}
        </p>
        <p>
          Deadline:{" "}
          {finish}
        </p>
      </div>
    </div>
  );
};

export default KanbanTail;
