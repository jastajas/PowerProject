import React from 'react';
import "./GanttChart.css";
import GanttTask from "./GanttTask";
import PowerDate from "../../Service/PowerDate";


const ganttTaskFacotry = (task, minTimeValue, resolution, ordinalNo, taskInterval) => {

    const {start, end, complexName} = task;

    const y = ordinalNo ? ordinalNo * taskInterval : ordinalNo;

    let width = PowerDate.dateToMilliseconds(end) * resolution - PowerDate.dateToMilliseconds(start) * resolution;
    width = width || 1;

    const x = (PowerDate.dateToMilliseconds(task.start) - minTimeValue) * resolution;

    const name = complexName.join(" / ");

    return {x, y, width, name}
}

const convertToGantTasks = (tasks, ganttConfig) => {

    const maxTimeValue = PowerDate.getMaxTaskTimeValue(tasks);

    const minTimeValue = PowerDate.getMinTaskTimeValue(tasks);

    const ganttResolution = ganttConfig.ganttCanvaWidth / (maxTimeValue - minTimeValue);

    const taskInterval = ganttConfig.taskHeight + ganttConfig.taskDescriptionSize + ganttConfig.gapSize + ganttConfig.innerGapSize;

    const ganttTasks = tasks.filter(task => task.isFinal)
        .map((task, index) => ganttTaskFacotry(task, minTimeValue, ganttResolution, index, taskInterval));

    return ganttTasks;

}

const drawCanvaGrid = (ganttConfig, minTimeValue, maxTimeValue) => {
    const {daysGrid, ganttCanvaWidth, xOffset} = ganttConfig;

    const DAILY_MILLISECONDS = 86400000;
    const increaseIndex = DAILY_MILLISECONDS * daysGrid * 2;

    let gridComponents = [minTimeValue];
    const iteratorTerminator = maxTimeValue - DAILY_MILLISECONDS * daysGrid * 2;

    for (let i = minTimeValue; i <= iteratorTerminator; i += increaseIndex) {
        gridComponents.push(i + increaseIndex);
    }

    const ganttResolution = (ganttCanvaWidth + 200) / (maxTimeValue - minTimeValue);

    return gridComponents.map(timePoint => (
        <rect className="gantGrid" x={((timePoint - minTimeValue) * ganttResolution)+xOffset} y="0"
              width={DAILY_MILLISECONDS * daysGrid * ganttResolution} height="100%"/>));

}

const getGridDates = (ganttConfig, minTimeValue, maxTimeValue) => {
    const {daysGrid, ganttCanvaWidth, xOffset, gridDatesSize} = ganttConfig;

    const DAILY_MILLISECONDS = 86400000;
    const increaseIndex = DAILY_MILLISECONDS * daysGrid;

    let gridDates = [minTimeValue];
    const iteratorTerminator = maxTimeValue - DAILY_MILLISECONDS * daysGrid;

    for (let i = minTimeValue; i <= iteratorTerminator; i += increaseIndex) {
        gridDates.push(i + increaseIndex);
    }

    const ganttResolution = (ganttCanvaWidth + 200) / (maxTimeValue - minTimeValue);


    return gridDates.map((timePoint, index) => (
        <text className="gantGrid-date" x={((timePoint - minTimeValue) * ganttResolution)+xOffset} y="10"
    width="auto" fontSize={gridDatesSize}>{PowerDate.getSimplifyDate(timePoint)}</text>));

}

const setGanttNominalWidth = tasks =>{

    const FOUR_MONTHS = 10368000000;
    const GROWTH_INDEX = 1800 / FOUR_MONTHS;

    const maxTimeValue = PowerDate.getMaxTaskTimeValue(tasks);
    const minTimeValue = PowerDate.getMinTaskTimeValue(tasks);

    const duration = maxTimeValue - minTimeValue;

    return duration <= FOUR_MONTHS ? 1800 : 1800 + (duration - FOUR_MONTHS) * GROWTH_INDEX;

}

class GanttChart extends React.Component {

    zoomScope = [0.1,0.25,0.5,0.75,1,1.25,1.5,2,3];

    state = {
        nominalWidth: this.props.tasks.length && setGanttNominalWidth(this.props.tasks),
        zoom: 1,
    }

    componentDidUpdate(prevProps, prevState) {
        const nominalWidth = this.props.tasks.length && setGanttNominalWidth(this.props.tasks);
        nominalWidth !== prevState.nominalWidth && this.setState({nominalWidth,zoom:1});
    }

    handleZoomChange = (ev)=>{

        const zoom = ev.target.value;

        this.setState({zoom});

    }

    ganttConfig = {
        ganttCanvaWidth: this.state.nominalWidth * this.state.zoom,
        taskHeight: 15,
        innerGapSize: 2,
        taskDescriptionSize: 14,
        gridDatesSize: 10,
        gapSize: 15,
        xOffset: 30,
        yOffset: 50,
        daysGrid: 5
    }

    render() {

        this.ganttConfig.ganttCanvaWidth = this.state.nominalWidth * this.state.zoom < 1800 ? 1800 : this.state.nominalWidth * this.state.zoom;


        const zoomOptions = this.zoomScope.map(zoom => (<option value={zoom}>{zoom}</option>));

        let h = 0;
        let ganttTasks = null;
        let ganttGrid = null;
        let ganttGridDates = null;
        
        if (this.props.tasks.length) {
            h = (this.props.tasks.filter(task => task.isFinal).length * (this.ganttConfig.taskHeight + this.ganttConfig.taskDescriptionSize + this.ganttConfig.innerGapSize + this.ganttConfig.gapSize));
            ganttTasks = convertToGantTasks(this.props.tasks, this.ganttConfig);
            ganttTasks = ganttTasks.map(task => (<GanttTask task={task} ganttConfig={this.ganttConfig}/>));
            ganttGrid = drawCanvaGrid(this.ganttConfig, PowerDate.getMinTaskTimeValue(this.props.tasks), PowerDate.getMaxTaskTimeValue(this.props.tasks));
            ganttGridDates = getGridDates(this.ganttConfig, PowerDate.getMinTaskTimeValue(this.props.tasks), PowerDate.getMaxTaskTimeValue(this.props.tasks));
        }
         
        return (<section className="gantt-chart">
        <svg width={this.ganttConfig.ganttCanvaWidth + 200} height="50px" className="ganttCanvaHeader">
            {ganttGridDates || false}   
        </svg>
        <svg width={this.ganttConfig.ganttCanvaWidth + 200} height={h} className="ganttCanva">
            {ganttGrid || false}
            {/* {ganttGridDates || false} */}
            {ganttTasks || false}
        </svg>
        <select className="zoomSelection" name="zoom" value={this.state.zoom} onChange={ev=>this.handleZoomChange(ev)}>
             {zoomOptions}
         </select></section>
        );

    }

}

export default GanttChart;
