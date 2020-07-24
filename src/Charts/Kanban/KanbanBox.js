import React from "react";
import KanbanTail from './KanbanTail';
import './KanbanBox.css';

const KanbanBox = (props) => {

  const kanbanTails = props.kanbanTasks.map(task => <KanbanTail key={task.id} task={task} activateToolTip={props.activateToolTip} disactivateToolTip={props.disactivateToolTip} taskNameGenerator={props.taskNameGenerator}/>);

  return (
    <div className="kanbanBox">
      <div className="headerKanban">
          <h3 className="">{props.name}</h3>
          <p className="tailCounter">{kanbanTails.length}</p>
      </div>
      <div className="kanbanList">
        {kanbanTails}
      </div>
    </div>
  );
};

export default KanbanBox;
