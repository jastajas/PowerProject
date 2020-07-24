import React from "react";
import KanbanBox from "./KanbanBox";
import './KanbanBoard.css';
import ToolTipResource from '../../Components/ToolTipResource';
import PowerFilter from "../../Service/PowerFilter";


class KanbanBoard extends React.Component {

    state = {
        resourceInfo: null,
    }

    activateToolTip = (ev, taskId) => {
        const {clientY, clientX} = ev;

        this.setState({
            resourceInfo: {
                taskId: taskId,
                positionX: clientX,
                positionY: clientY
            }
        })
    }

    disactivateToolTip = () => {

        this.setState({
            resourceInfo: null,
        })
    }

    primaryFilter = (tasks) => {
        const powerFilter = new PowerFilter();
        const {filter} = this.props;

        return tasks.filter(task => task.isFinal && powerFilter.setTask(task)
            .checkName(filter.get("name"))
            .checkTaskBeforeDate(filter.get("finish"))
            .checkTaskAfterDate(filter.get("start"))
            .checkDepartment(filter.get("department"))
            .checkTaskOwner(filter.get("person"))
            .checkStatus(filter.get("status"))
            .filterAll()
        );
    }

    getSuperTaskName = outlineNumber => {

        let complexName = [];

        const splitNo = outlineNumber.split(".");

        const searchedNo = splitNo.slice(0, splitNo.length - 1).join(".");

        const task = this.props.tasks.find(task => task.outlineNumber === searchedNo);

        if (task.outlineLevel > 1) {
            complexName = [...this.getSuperTaskName(task.outlineNumber)];
        }

        return [...complexName, task.name];

    }

    render() {
        let resources = [];
        let tasksToDo = null;
        let tasksInProgress = null;
        let tasksDone = null;
        const {tasks} = this.props;
        if (tasks.length) {

            const filteredTasks = this.primaryFilter(tasks);

            tasksToDo = filteredTasks.filter(task => task.status === "to do");
            tasksInProgress = filteredTasks.filter(task => task.status === "in progress");
            tasksDone = filteredTasks.filter(task => task.status === "done");

            if (this.state.resourceInfo) {
                const activeTaskIndex = this.props.tasks.findIndex(task => task.id === this.state.resourceInfo.taskId);
                resources = this.props.tasks[activeTaskIndex].assignments;
            }

        }
        return tasks.length > 0 && (<div className="kanbanBoard">

            <KanbanBox name="to do" kanbanTasks={tasksToDo} activateToolTip={this.activateToolTip}
                       disactivateToolTip={this.disactivateToolTip} taskNameGenerator={this.getSuperTaskName}/>

            <KanbanBox name="in progress" kanbanTasks={tasksInProgress} activateToolTip={this.activateToolTip}
                       disactivateToolTip={this.disactivateToolTip} taskNameGenerator={this.getSuperTaskName}/>

            <KanbanBox name="done" kanbanTasks={tasksDone} activateToolTip={this.activateToolTip}
                       disactivateToolTip={this.disactivateToolTip} taskNameGenerator={this.getSuperTaskName}/>

            {resources.length > 1 ?
                <ToolTipResource id="toolTip" resources={resources} xPosition={this.state.resourceInfo.positionX}
                                 yPosition={this.state.resourceInfo.positionY}/> : null}
        </div>);
    }
}

export default KanbanBoard;
