import React from 'react';
import {Route,Switch} from 'react-router-dom';

import KanbanBoard from '../Charts/Kanban/KanbanBoard';
import GanttChart from '../Charts/Gantt/GanttChart';
import TaskList from '../Charts/List/TaskList';
import Holidays from "../Charts/Holidays/Holidays";

import MainPage from "../Charts/MainPage";
import ErrorPage from "../Charts/ErrorPage";

import './MainChart.css';

const MainChart = props => {
    return ( 
    <section className="mainChart">
        <Switch>
            <Route path="/" exact={true} render={() => <MainPage  {...props} />}/>
            <Route path="/kanban" render={() => <KanbanBoard  {...props} />}/>
            <Route path="/gantt" render={() => <GanttChart {...props} />}/>
            <Route path="/list" render={() => <TaskList {...props} />}/>
            <Route path="/holidays" render={() => <Holidays {...props} />}/>
            <Route component={ErrorPage} />}/>
        </Switch>
    </section> 
    );
}
 
export default MainChart;
