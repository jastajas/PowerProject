import React from 'react';
import {Route} from 'react-router-dom';
import KanbanBoard from '../Charts/Kanban/KanbanBoard';
import GanttChart from '../Charts/Gantt/GanttChart';
import TaskList from '../Charts/List/TaskList';
import './MainChart.css';
import MainPage from "../Charts/MainPage";

const MainChart = props => {
    return ( 
    <section className="mainChart">
        <Route path="/" exact={true} render={() => <MainPage  {...props} />}/>
        <Route path="/kanban" render={() => <KanbanBoard  {...props} />}/>
        <Route path="/gantt" render={() => <GanttChart {...props} />}/>
        <Route path="/list" render={() => <TaskList {...props} />}/>
    </section> 
    );
}
 
export default MainChart;
