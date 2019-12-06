import React from "react";
import KanbanBox from "./KanbanBox";
import './KanbanBoard.css';
import ToolTipResource from '../../Components/ToolTipResource';

class KanbanBoard extends React.Component {
    state = { 
        resourceInfo: null,
     }

     activateToolTip = (ev, taskId) =>{
        const {clientY, clientX} = ev;

        this.setState({
            resourceInfo: {
                taskId: taskId,
                positionX: clientX,
                positionY: clientY
            }
        })
     }

     disactivateToolTip = () =>{

        this.setState({
            resourceInfo: null,
        })
     }


    render() { 
        let resources = [];
        let tasksToDo = null;
        let tasksInProgress = null;
        let tasksDone = null;
        if(this.props.tasks.length){
            tasksToDo = this.props.tasks.filter(task => task.status === "to do" && task.isFinal);
            tasksInProgress = this.props.tasks.filter(task => task.status === "in progress" && task.isFinal);
            tasksDone = this.props.tasks.filter(task => task.status === "done" && task.isFinal);

            if (this.state.resourceInfo){
                const activeTaskIndex = this.props.tasks.findIndex(task => task.id === this.state.resourceInfo.taskId);
                resources = this.props.tasks[activeTaskIndex].resources;
            }

        }
        return this.props.tasks.length > 0 && (<div className="kanbanBoard">
                                                <KanbanBox name="to do" kanbanTasks={tasksToDo} activateToolTip={this.activateToolTip} disactivateToolTip={this.disactivateToolTip}/>
                                                <KanbanBox name="in progress" kanbanTasks={tasksInProgress} activateToolTip={this.activateToolTip} disactivateToolTip={this.disactivateToolTip}/>
                                                <KanbanBox name="done" kanbanTasks={tasksDone} activateToolTip={this.activateToolTip} disactivateToolTip={this.disactivateToolTip}/>
                                                {resources.length > 1 ? <ToolTipResource id="toolTip" resources={resources} xPosition={this.state.resourceInfo.positionX} yPosition={this.state.resourceInfo.positionY}/>: null}
                                            </div>);
    }
}
 
export default KanbanBoard;

// const KanbanBoard = props => {

    
//     let tasksToDo = null;
//     let tasksInProgress = null;
//     let tasksDone = null;
//     if(props.tasks.length){
//         tasksToDo = props.tasks.filter(task => task.status === "to do" && task.isFinal);
//         tasksInProgress = props.tasks.filter(task => task.status === "in progress" && task.isFinal);
//         tasksDone = props.tasks.filter(task => task.status === "done" && task.isFinal);
//     }
//     return props.tasks.length > 0 && (<div className="kanbanBoard">
//                                             <KanbanBox name="to do" kanbanTasks={tasksToDo}/>
//                                             <KanbanBox name="in progress" kanbanTasks={tasksInProgress}/>
//                                             <KanbanBox name="done" kanbanTasks={tasksDone}/>
//                                         </div>);
// };
