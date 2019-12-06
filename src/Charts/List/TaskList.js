import React from 'react';
import TaskRow from './TaskRow';
import './TaskList.css';
import TaskForm from '../../Components/TaskForm';
import ToolTipResource from '../../Components/ToolTipResource';

class TaskList extends React.Component {
    state = {
        isResourceInfoActive: false,
        editedTaskId: null,
        resourceInfo: null
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

     handleDoubleClickRow = editedTaskId => {
        this.setState({editedTaskId});
    }

    exitTaskForm = () =>{
        this.setState({editedTaskId: null,});
    }


    render() {

        let resources = [];
        let tableRows = null;
        let editedTask = null;
        if(this.props.tasks.length){

            tableRows = this.props.tasks.map((task, index)=>(<TaskRow key={task.id} task={task} index={index} activateToolTip={this.activateToolTip} disactivateToolTip={this.disactivateToolTip} activateTaskForm={this.handleDoubleClickRow} />));

            const indexEditedTask = this.state.editedTaskId && this.props.tasks.findIndex(task => task.id === this.state.editedTaskId);
            
            editedTask = indexEditedTask >= 0 && this.props.tasks[indexEditedTask];

            if (this.state.resourceInfo){
                const activeTaskIndex = this.props.tasks.findIndex(task => task.id === this.state.resourceInfo.taskId);
                resources = this.props.tasks[activeTaskIndex].resources;
            }
        
        }
        return this.props.tasks.length > 0 && (<section className="taskList">
            <table>
                <thead>
                    <tr>
                        <th>on</th>
                        <th>name</th>
                        <th>start</th>
                        <th>end</th>
                        <th>status</th>
                        <th>resources</th>
                        <th>complete</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
            {resources.length > 1 ? <ToolTipResource id="toolTip" resources={resources} xPosition={this.state.resourceInfo.positionX} yPosition={this.state.resourceInfo.positionY}/>: null}
            {editedTask && <TaskForm task={editedTask} exitTaskForm={this.exitTaskForm} resources={this.props.resources}/>}
            </section> );
       
    }
    }
 
export default TaskList;

