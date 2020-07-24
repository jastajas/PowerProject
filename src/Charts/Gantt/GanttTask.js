import React from 'react';
import './GanttTask.css';

const GanttTask = props => {

 const {x, y, width, fullName} = props.task;
 const {taskHeight, innerGapSize, taskDescriptionSize, xOffset, yOffset} = props.ganttConfig;

 const yText = y + taskHeight + innerGapSize + 12;
 const xText = x + 5;


    return(
        <>
            <rect className="gantTask" x={x + xOffset} y={y + yOffset} width={width} height={taskHeight}/>
            <text className="gantTaskDescription" y={yText + yOffset} x={xText + xOffset} width="auto" fontSize={taskDescriptionSize}>{fullName}</text>
        </>

    );
}

export default GanttTask;
