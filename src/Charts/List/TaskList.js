import React from 'react';
import TaskRow from './TaskRow';
import './TaskList.css';
import TaskForm from '../../Components/TaskForm';
import ToolTipResource from '../../Components/ToolTipResource';
import ContextMenu from '../../Components/ContextMenu';
import PowerFilter from "../../Service/PowerFilter";

class TaskList extends React.Component {
    state = {
        isResourceInfoActive: false,
        editedTaskId: null,
        resourceInfo: null,
        contextMenu: null
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

    handleContextMenu = ev =>{

        if(this.state.contextMenu) return false;

        const {clientX, clientY} = ev;

        this.setState({
            contextMenu: {
                positionX: clientX,
                positionY: clientY
            }
        })
    }

    exitContextMenu = () => {
        this.setState({
            contextMenu: null
        })
    }

    handleKeyDown = ev => {
        ev = ev || window.event;
        ev.keyCode === 27 && this.exitContextMenu();
    }

    handleSelectAll = ev =>{

        const selected = ev.target.checked;

        this.props.tasks.forEach(task => {
            task.selected = selected;
            this.props.updateTask(task);})

    }

    handleTaskSelect = (ev, id) =>{

        const task = this.props.tasks.find(task=>task.id === id);

        if (task) task.selected = ev.target.checked;

        this.props.updateTask(task);

    }

    // getSuperTaskName = outlineNumber => {
    //
    //     let complexName = [];
    //
    //     const splitNo = outlineNumber.split(".");
    //
    //     const searchedNo = splitNo.slice(0, splitNo.length-1).join(".");
    //
    //     const task = this.props.tasks.find(task => task.outlineNumber === searchedNo);
    //
    //     if(task.outlineLevel > 1){
    //       complexName = [...this.getSuperTaskName(task.outlineNumber)];
    //     }
    //
    //     return [...complexName, task.name];
    //
    // }

    primaryFilter = (tasks) =>{
        const powerFilter = new PowerFilter();
        const {filter} = this.props;

        return tasks.filter(task => powerFilter.setTask(task)
            .checkName(filter.get("name"))
            .checkTaskBeforeDate(filter.get("finish"))
            .checkTaskAfterDate(filter.get("start"))
            .checkDepartment(filter.get("department"))
            .checkTaskOwner(filter.get("person"))
            .checkStatus(filter.get("status"))
            .filterAll()
        );
    }

    render() {

        let resources = [];
        let tableRows = null;
        let editedTask = null;

        const {tasks} = this.props;
        if(tasks.length){

            tableRows = this.primaryFilter(tasks)
                            .map((task, index)=>(<TaskRow key={task.id} task={task} /*taksNameGenrator={this.getSuperTaskName} index={index}*/ activateToolTip={this.activateToolTip} disactivateToolTip={this.disactivateToolTip} activateTaskForm={this.handleDoubleClickRow} updateTask={this.props.updateTask} handleTaskSelect={this.handleTaskSelect}/>));

            const indexEditedTask = this.state.editedTaskId && this.props.tasks.findIndex(task => task.id === this.state.editedTaskId);
            
            editedTask = indexEditedTask >= 0 && this.props.tasks[indexEditedTask];

            if (this.state.resourceInfo){
                const activeTaskIndex = this.props.tasks.findIndex(task => task.id === this.state.resourceInfo.taskId);
                resources = this.props.tasks[activeTaskIndex].assignments;
            }
        
        }
        return tasks.length > 0 && (<section className="taskList" onClick={this.exitContextMenu}
                                                        onKeyDown={this.handleKeyDown}
                                                        tabIndex="0"
                                                        onContextMenu={ev => {  ev.preventDefault();
                                                            this.handleContextMenu(ev);}}>
            <table>
                <thead>
                    <tr>
                        <th>on</th>
                        <th>name</th>
                        <th>start</th>
                        <th>finish</th>
                        <th>status</th>
                        <th>resources</th>
                        <th>complete</th>
                        <th><input type="checkbox" onChange={this.handleSelectAll}/></th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
            {resources.length > 1 ? <ToolTipResource id="toolTip" resources={resources} xPosition={this.state.resourceInfo.positionX} yPosition={this.state.resourceInfo.positionY}/>: null}
            {editedTask && <TaskForm task={editedTask} exitTaskForm={this.exitTaskForm} resources={this.props.resources} updateTask={this.props.updateTask}/>}
            {this.state.contextMenu && <ContextMenu contextMenu={this.state.contextMenu} downloadXmlFile={this.props.downloadXmlFile} rem={this.remove}/>}
            </section> );
       
    }
    }
 
export default TaskList;

