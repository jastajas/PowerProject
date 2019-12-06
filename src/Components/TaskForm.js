import React from 'react';
import './TaskForm.css';

class TaskForm extends React.Component {
    state = { 
        task:{
            id: this.props.task.id,
            name: this.props.task.name,
            start: this.props.task.start,
            finish: this.props.task.end,
            outlineNumber: "",
            outlineLevel:"",
            resources: this.props.task.resources,
            percentComplete: this.props.task.percentComplete,
            status: this.props.task.status,
        },  
       newResource: { 
        newEffort: 0,
        newResourceId: null,
    }
     }

     handleInputChange = ev => {

        const {name, value} = ev.target;

        this.setState(prevState =>{
            const {task} = prevState;
            task[name] = value;

            return {task};
        } )

     }
     handleNewResourceChange = ev =>{
         const {name, value} = ev.target;

         this.setState(prevState =>{
            const {newResource} = prevState;
            newResource[name] = value;

            return {newResource};
        })

     }

     addNewResource = () => {
        const{newResourceId, newEffort} = this.state.newResource;

        if(!newResourceId && !newResourceId.length) return alert("NIE WYBRANO ZASOBU!!!");
   
        const newAssignedResource = {
            resource: this.props.resources.find(resource => resource.id === newResourceId),
            work: {
                hours: newEffort,
                minutes: 0,
                seconds: 0
            }
        }
   
        this.setState(prevState =>{
            const {task} = prevState;
            task.resources.push(newAssignedResource);
            return {task,
                newResource: {
                    newResourceId: 0,
                    newEffort: 0
                }
            };
        })
     }

     handleResourceChange = (ev, id) => {

        const {name, value} = ev.target;

        this.setState(prevState =>{
            const {task} = prevState;
            
            task.resources = task.resources.map(resource => {
                if(resource.resource.id !== id) return resource;

                if(name === "resource"){
                    resource.resource = this.props.resources && this.props.resources.find(resource => resource.id === value);
                } else if(name === "work"){
                    resource.work.hours = value;
                }

                return resource;
            } );
            return {task};
        })

     }

     deleteResource = id =>{

        this.setState(prevState =>{
            const {task} = prevState;
            task.resources = task.resources.filter(resource => resource.resource.id !== id);
            return {task};
        })

     }

    render() { 
        const{name, start, finish, resources ,percentComplete} = this.state.task;

        const resorcesList = this.props.resources && this.props.resources
                .filter(resource =>resource.name !== "")
                .map(resource => {return {resource: resource.name + " - " + resource.department, id: resource.id};})
                .map((resource, index) => (<option key={index} value={resource.id}>{resource.resource}</option>));

        const resourcesInputs = resources.map(resource => (
            <div className="resourceBlock">
                <select value={resource.resource.id} name="resource" onChange={ev=>this.handleResourceChange(ev,resource.resource.id)}>
                    {resorcesList}
                </select>
                <input className="workInput" type="number" name="work" step="1" min="0" value={resource.work.hours} onChange={ev=>this.handleResourceChange(ev,resource.resource.id)}/>
                <button type="button" onClick={()=>{
                    this.deleteResource(resource.resource.id)}}>X</button>
            </div>))

        return (

        <form className="taskForm" style={{display: "block"}}>
            <div className="taskFormChart"><h3>Task Chart</h3>
                <div className="formElement">
                    <label htmlFor="taskNameInput"><span>t</span>ask <span>n</span>ame:</label>
                    <input id="taskNameInput" type="text" name="name" value={name} onChange={ev=>this.handleInputChange(ev)}/>
                </div>
                <div className="formElement">
                    <label htmlFor="startDateInput"><span>s</span>tart:</label>
                    <input id="startDateInput" type="date" name="start" value={start} onChange={ev=>this.handleInputChange(ev)}/>
                </div>
                <div className="formElement">
                    <label htmlFor="finishDateInput"><span>e</span>nd:</label>
                    <input id="finishDateInput" type="date" name="finish" value={finish} onChange={ev=>this.handleInputChange(ev)}/>
                </div>
                <div className="formElement">
                    <label htmlFor="resourceInput"><span>r</span>esources and efforts:</label>
                    <div className="resourceBlock"> 
                        <select id="resourceInput" name="newResourceId" value={this.state.newResource.newResourceId} onChange={ev => this.handleNewResourceChange(ev)}>
                            <option value="">Select...</option>
                            {resorcesList}
                        </select>
                        <input id="workInput" className="workInput" type="number" name="newEffort" value={this.state.newResource.newEffort} onChange={ev => this.handleNewResourceChange(ev)}/>
                        <button type="button" onClick={this.addNewResource}>ADD</button>
                    </div>
                    {resourcesInputs}
                </div>
                <div className="formElement">
                    <label htmlFor="completeInput"><span>c</span>ompletion:</label>
                    <input id="completeInput" step="1" min="0" max="100" type="number" name="percentComplete" value={percentComplete} onChange={ev=>this.handleInputChange(ev)}/>
                </div>
               <div className="formButtons">
                    <input type="submit" value="save"></input>
                    <button type="button" onClick={()=>this.props.exitTaskForm()}>cancel</button>
               </div>              
            </div>
        </form> );
    }
}
 
export default TaskForm;
