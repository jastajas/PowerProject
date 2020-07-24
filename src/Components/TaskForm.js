import React from 'react';
import './TaskForm.css';

class TaskForm extends React.Component {
    state = {
        task: {
            id: this.props.task.id,
            name: this.props.task.name,
            start: this.props.task.start,
            finish: this.props.task.finish,
            outlineNumber: this.props.task.outlineNumber,
            outlineLevel: this.props.task.outlineLevel,
            assignments: this.props.task.assignments,
            percentComplete: this.props.task.percentComplete,
            status: this.props.task.status,
        },
        newResource: {
            newEffort: 0,
            newResourceId: null,
        },
        errors: {
            name: false,
            start: false,
            finish: false,
            percentComplete: false,
        }
    }

    messages = {
        name: "Name should contain at least 1 character",
        start: "Start date format is incorrect or is later than finish date",
        finish: "Finish date format is incorrect or is earlier than start date",
        percentComplete: "Progress should be integer from 0 to 100",
    }

    validateName = () => {

        const {errors, task} = this.state;
        const isEmpty = !task.name.length;
        errors.name = isEmpty;

        this.setState({errors});

        return {name: isEmpty};

    }

    validateDates = () => {

        const {task, errors} = this.state;

        const startDate = new Date(task.start);
        const finishDate = new Date(task.finish);

        errors.start = isNaN(startDate.getTime());
        errors.finish = isNaN(finishDate.getTime());

        const isReverse = errors.start || errors.finish || startDate.getTime() > finishDate.getTime();

        errors.start = errors.start || isReverse;
        errors.finish = errors.finish || isReverse;

        this.setState({errors});

        return {
            start: errors.start,
            finish: errors.finish
        };

    }

    correctDateValue = ev => {
        const fieldName = ev.target.name;
        const oppositeDate = fieldName == "start" ? "finish" : "start";

        this.setState(prevState => {

            const {task} = prevState;

            task[oppositeDate] = Date.parse(task.finish) < Date.parse(task.start) ? task[fieldName] : task[oppositeDate];

            return {task};
        })

    }

    validatePercentage = () => {

        const regExp = new RegExp("^(100|[1-9]?[0-9])$");

        const {errors, task} = this.state;
        const isIncorrectValue = !regExp.test(task.percentComplete);
        errors.percentComplete = isIncorrectValue;

        this.setState({errors});

        return {percentComplete: isIncorrectValue};
    }

    handleSubmit = ev => {
        ev.preventDefault();

        const {updateTask, exitTaskForm} = this.props;
        const {task} = this.state;

        const errors = Object.assign({}, this.validateName(), this.validateDates(), this.validatePercentage());

        for (let key in errors) {
            if (errors[key]) return alert("Form is not complete or some values are incorrect. \n Please check form data.");
        }

        updateTask(task);
        exitTaskForm();
    }


    handleInputChange = ev => {

        const {name, value} = ev.target;

        this.setState(prevState => {
            const {task} = prevState;
            task[name] = name == "percentComplete" ? parseInt(value) : value;

            return {task};
        })

    }
    handleNewResourceChange = ev => {
        const {name, value} = ev.target;

        this.setState(prevState => {
            const {newResource} = prevState;
            newResource[name] = value;

            return {newResource};
        })

    }

    addNewResource = () => {
        const {newResourceId, newEffort} = this.state.newResource;

        if (!newResourceId && !newResourceId.length) return alert("NIE WYBRANO ZASOBU!!!");

        const newAssignedResource = {
            resource: this.props.resources.find(resource => resource.id === newResourceId),
            work: {
                hours: newEffort,
                minutes: 0,
                seconds: 0
            }
        }

        this.setState(prevState => {
            const {task} = prevState;
            task.resources.push(newAssignedResource);
            return {
                task,
                newResource: {
                    newResourceId: 0,
                    newEffort: 0
                }
            };
        })
    }

    handleResourceChange = (ev, id) => {

        const {name, value} = ev.target;

        this.setState(prevState => {
            const {task} = prevState;

            task.resources = task.resources.map(resource => {
                if (resource.resource.id !== id) return resource;

                if (name === "resource") {
                    resource.resource = this.props.resources && this.props.resources.find(resource => resource.id === value);
                } else if (name === "work") {
                    resource.work.hours = value;
                }

                return resource;
            });
            return {task};
        })

    }

    deleteResource = id => {

        this.setState(prevState => {
            const {task} = prevState;
            task.resources = task.resources.filter(resource => resource.resource.id !== id);
            return {task};
        })

    }

    render() {
        const {name, start, finish, assignments, percentComplete} = this.state.task;
        const {errors} = this.state;

        const resourcesList = this.props.resources && this.props.resources
            .filter(resource => resource.name !== "")
            .map(resource => {
                return {resource: resource.name + " - " + resource.department, id: resource.id};
            })
            .map((resource, index) => (<option key={index} value={resource.id}>{resource.resource}</option>));

        const resourcesInputs = assignments.map(assignment => (
            <div className="resourceBlock">
                <select value={assignment.resource.id} name="resource"
                        onChange={ev => this.handleResourceChange(ev, assignment.resource.id)}>
                    {resourcesList}
                </select>
                <input className="workInput" type="number" name="work" step="1" min="0" value={assignment.work.hours}
                       onChange={ev => this.handleResourceChange(ev, assignment.resource.id)}/>
                <button type="button" onClick={() => {
                    this.deleteResource(assignment.resource.id)
                }}>X
                </button>
            </div>))

        return (

            <form className="taskForm" style={{display: "block"}} onSubmit={this.handleSubmit}>
                <div className="taskFormChart"><h3>Task Chart</h3>
                    <div className="formElement">
                        <label htmlFor="taskNameInput"><span>t</span>ask <span>n</span>ame:</label>
                        <input id="taskNameInput" type="text" name="name" value={name}
                               onChange={ev => this.handleInputChange(ev)} onBlur={this.validateName}/>
                        {errors.name && <span className="errorMsg">{this.messages.name}</span>}
                    </div>
                    <div className="formElement">
                        <label htmlFor="startDateInput"><span>s</span>tart:</label>
                        <input id="startDateInput" type="date" name="start" value={start}
                               onChange={ev => this.handleInputChange(ev)} onBlur={this.correctDateValue}/>
                        {errors.start && <span className="errorMsg">{this.messages.start}</span>}
                    </div>
                    <div className="formElement">
                        <label htmlFor="finishDateInput"><span>e</span>nd:</label>
                        <input id="finishDateInput" type="date" name="finish" value={finish}
                               onChange={ev => this.handleInputChange(ev)} onBlur={this.correctDateValue}/>
                        {errors.finish && <span className="errorMsg">{this.messages.finish}</span>}
                    </div>
                    <div className="formElement">
                        <label htmlFor="resourceInput"><span>r</span>esources and efforts:</label>
                        <div className="resourceBlock">
                            <select id="resourceInput" name="newResourceId" value={this.state.newResource.newResourceId}
                                    onChange={ev => this.handleNewResourceChange(ev)}>
                                <option value="">Select...</option>
                                {resourcesList}
                            </select>
                            <input id="workInput" className="workInput" type="number" name="newEffort"
                                   value={this.state.newResource.newEffort}
                                   onChange={ev => this.handleNewResourceChange(ev)}/>
                            <button type="button" onClick={this.addNewResource}>ADD</button>
                        </div>
                        {resourcesInputs}
                    </div>
                    <div className="formElement">
                        <label htmlFor="completeInput"><span>c</span>ompletion:</label>
                        <input id="completeInput" step="1" min="0" max="100" type="number" name="percentComplete"
                               value={percentComplete} onChange={ev => this.handleInputChange(ev)}
                               onBlur={this.validatePercentage}/>
                        {errors.percentComplete && <span className="errorMsg">{this.messages.percentComplete}</span>}
                    </div>
                    <div className="formButtons">
                        <input type="submit" value="save"></input>
                        <button type="button" onClick={() => this.props.exitTaskForm()}>cancel</button>
                    </div>
                </div>
            </form>);
    }
}

export default TaskForm;
