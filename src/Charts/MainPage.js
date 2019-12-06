import React from 'react';
import "./MainPage.css";
import MainImage from "../images/main.jpg";
import Duration from "../images/duration.svg";
import ToDo from "../images/toDo.svg";
import Inprogress from "../images/inProgress.svg";
import Done from "../images/done.svg";
import PowerDate from "../Service/PowerDate";


const MainPage = props => {

    let taskInfo = null;

    if (props.tasks.length) {
        const tasksToDo = props.tasks.filter(task => task.status === "to do" && task.isFinal).length;
        const tasksInProgress = props.tasks.filter(task => task.status === "in progress" && task.isFinal).length;
        const tasksDone = props.tasks.filter(task => task.status === "done" && task.isFinal).length;

        let startDate = PowerDate.getMinTaskTimeValue(props.tasks);
        let finishDate = PowerDate.getMaxTaskTimeValue(props.tasks);

        taskInfo = (<div className="main-page-info">
            <h2>Project {props.name.split(".xml")[0]}</h2>
            <ul>
                <li><img src={Duration} alt=""/>
                    <p>project duration from {PowerDate.getSimplifyDate(startDate)} to {PowerDate.getSimplifyDate(finishDate)} </p>
                </li>
                <li><img src={ToDo} alt=""/>
                    <p>count task to do: {tasksToDo}</p>
                </li>
                <li><img src={Inprogress} alt=""/>
                    <p>count task in progress: {tasksInProgress}</p>
                </li>
                <li><img src={Done} alt=""/>
                    <p>count task done: {tasksDone}</p>
                </li>
            </ul>
        </div>)
    }
    const basicInfo = (<div className="main-page-info"><h2>no project loaded</h2>
    <p className="main-page-description">This is application for reading MS Project schedule with xml extension. Please apply project file by click button in the right up corner.</p></div>)

    return (<section className="main-page">
        <img className="main-page-heroImg" src={MainImage} alt=""/>
            {taskInfo || basicInfo}

    </section>);
}

export default MainPage;
