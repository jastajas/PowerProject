import React from "react";
import "./App.css";
import {BrowserRouter as Router} from 'react-router-dom';
import ChartNav from "./layouts/ChartNav";
import MainChart from "./layouts/MainChart";
import Header from "./layouts/Header";
import Filters from './layouts/Filters';


const readFile = (file, handleFileContent) => {
    const reader = new FileReader();

    reader.onload = event => {
        event.target.result && handleFileContent(event.target.result);
    };

    file && reader.readAsText(file);
}


function isXmlFile(inputFileElement) {

    if (!inputFileElement) throw new Error("No arguments provided!");
    if (!inputFileElement.files) throw new Error("Incorrect element type");
    if (!inputFileElement.files.length) throw new Error("No files provided!");

    return "text/xml" === inputFileElement.files[0].type;

}

const combineProjectElements = (tasks, resources, assignments) => {
    tasks = tasks.map(task => {

        const taskResources = assignments
                        .filter(assignment => assignment.taskId === task.id && assignment.resourceId >= 0)
                        .map(assignment => {
                            const assignedResource = {};
                            assignedResource.resource = resources.find(resource => resource.id === assignment.resourceId);
                            assignedResource.work = assignment.work;
                            return assignedResource;
                           
                        });

        task.resources = taskResources;

        return task;
    });
    return tasks;
}

const setComplexName = (tasks, outlineNumber, name = [], level = 1) => {

    level++;

    const selectedTask = tasks.find(task => task.outlineNumber === outlineNumber);

    const subtasks = tasks.filter(subtask => subtask.outlineNumber.startsWith(selectedTask.outlineNumber) && subtask.outlineLevel === level)
        .map(subtask => {
            setComplexName(tasks, subtask.outlineNumber, [...name, selectedTask.name], level);
            return subtask;
        });

    selectedTask.isFinal = !subtasks.length;
    selectedTask.complexName = !subtasks.length ? [...name, selectedTask.name] : null;


}

const getSimplifyDate = date => {
    if (!date) return "";
    const dateObject = new Date(date);
    return dateObject.toISOString().substring(0,10);
}

const taskFilter = (task, filters) => {

  return   task.complexName.findIndex(name => name.toUpperCase().includes(filters.get("name").toUpperCase())) + 1 &&
           task.start.includes(filters.get("start")) &&
           task.end.includes(filters.get("end")) &&
           containResource(task,filters);
}

const containResource = (task, filters) =>{

    if (filters.get("person") === "" && filters.get("department") === "") return true;

    return task.resources.findIndex(resource => resource.resource.name.toUpperCase().includes(filters.get("person").toUpperCase())
    && resource.resource.department.includes(filters.get("department"))) + 1;

}
const parseWorkObject = (workCode) =>{
    
    const work = {};
   
    work.hours = workCode.split("PT")[1].split("H")[0];
    work.minutes = workCode.split("H")[1].split("M")[0];
    work.seconds = workCode.split("M")[1].split("S")[0];

    return work;
}

class App extends React.Component {
    state = {
        file: null,
        tasks: [],
        filter: new Map(),
    };

    handleFile = ev => {
        const file = ev.target.files[0];

        if(!isXmlFile(ev.target)) return alert("Niewłaściwy format pliku! \n Wprowadź plik xml.");

        this.setState({file});

        readFile(file, this.handleProjctXml);
    };

    getTaskStatus = (startDate, endDate) => {
        const today = Date.now();
        const startDay = Date.parse(startDate);
        const endDay = Date.parse(endDate);

        if (today < startDay) return "to do";
        if (today > endDay) return "done";
        return "in progress";
    };

    handleProjctXml = xmlText => {
        const convert = require("xml-js");
        try {
            const msProjectJson = convert.xml2json(xmlText, {
                compact: true,
                spaces: 4
            });

            let {
                Tasks: {Task: tasks},
                Resources: {Resource: resources},
                Assignments: {Assignment: assignments}
            } = JSON.parse(msProjectJson).Project;

            tasks = tasks.filter(task => task.UID._text !== "0")
                .map(task => ({
                    id: task.UID._text,
                    name: task.Name._text,
                    start: getSimplifyDate(task.Start._text),
                    end: getSimplifyDate(task.Finish._text),
                    status: this.getTaskStatus(task.Start._text, task.Finish._text),
                    outlineNumber: task.OutlineNumber._text,
                    outlineLevel: parseInt(task.OutlineLevel._text),
                    mainOutlineNo: parseInt(task.OutlineNumber._text.split(".")[0]),
                    percentComplete: task.PercentComplete._text
                }));

            resources = resources
                .filter(resource => resource.ID && resource.Name)
                .map(resource => ({
                    id: resource.UID._text,
                    name: resource.Name._text,
                    department: resource.Group ? resource.Group._text : ""
                }));

            assignments = assignments
                .filter(assignment => assignment.TaskUID && assignment.ResourceUID)
                .map(assignment => ({
                    taskId: assignment.TaskUID._text,
                    resourceId: assignment.ResourceUID._text,
                    work: parseWorkObject(assignment.Work._text)
                }));

            tasks = combineProjectElements(tasks, resources, assignments);

            tasks.filter(task => task.outlineLevel === 1)
                .forEach(task => setComplexName(tasks, task.outlineNumber));

            this.setState(() => {
                return {
                    tasks,
                    resources
                };
            });
        } catch (error) {
        }
    };

    handleFilter = ev => {

        const {name, value} = ev.target;

        this.setState(prevState => {
            const {filter} = prevState;
            filter.set(name, value);

            return {filter};
        })
    }

    clearFilter = ev => {

        const {name} = ev.target;
        
        if(name !== "all"){
            this.setState(prevState => {
                const {filter} = prevState;
                filter.set(name, "");

                return {filter};
            })
        }else{
            this.getDefaultFilters();
        }
    }


    componentDidMount() {
        this.getDefaultFilters();
    }

    getDefaultFilters = () =>{
        this.setState(prevState => {
            const {filter} = prevState;
            filter.set("name", "");
            filter.set("person", "");
            filter.set("start", "");
            filter.set("end", "");
            filter.set("department", "");

            return {filter};
        })
    }

    render() {

        const tasks = this.state.tasks.filter(task => task.complexName)
            .filter(task => taskFilter(task, this.state.filter));

        return (
            <Router basename={process.env.PUBLIC_URL}>
                <>
                    <header>
                        <Header handleFile={this.handleFile} name={this.state.file?this.state.file.name:null} filePath={this.state.filePath}/>
                    </header>
                    <main>
                        <section className="mainSection">
                            <Filters setFilter={this.handleFilter} resources={this.state.resources} clearFilter={this.clearFilter}  filters={this.state.filter}/>

                            <MainChart tasks={tasks} resources={this.state.resources} name={this.state.file?this.state.file.name:null}/>
                        </section>
                        <ChartNav/>
                    </main>
                </>
            </Router>
        );
    }
}

export default App;
