import React from "react";
import Arrow from "../images/arrow.svg";
import './Filters.css';

class Filters extends React.Component {
    state = {
        isExtended: false,
    }


    handleClickButton = () => {
        const isExtended = !this.state.isExtended;
        this.setState({isExtended});
    }

    render() {
        const {filters ,setFilter, resources, statusesList} = this.props;
        const angleFilterArrow = this.state.isExtended ? 180 : 0;
        const statuses = [];

        const departmentList = resources && resources.filter(resource => resource.department !== "")
                .map(resource => resource.department)
                .filter((department, index, array) => array.indexOf(department) === index && department !== null)
                .map((department, index) => (<option key={index} value={department} >{department}</option>));

        if(statusesList){
            let index = 0;
            for (let status in statusesList){
                statuses.push((<option key={index}
                                       value={statusesList[status]}
                                      >{statusesList[status].toUpperCase()}</option>));
                index++;
            }
        }

        return (
            <section className="filters">
                <button onClick={this.handleClickButton}>
                    <img src={Arrow} alt="arrow" style={{transform: `rotate(${angleFilterArrow}deg)`}}/>
                    <p>filters</p>
                </button>
                <div className="filter-inputs" style={{height: this.state.isExtended ? "80px" : "0px"}}>
                    <div className="inputBox">
                        <label htmlFor="nameFilter">task name:</label>
                        <input id="nameFilter" type="text" name="name" onChange={setFilter} value={filters.get("name")}/>
                        <button type="button" onClick={ev=>this.props.clearFilter(ev)} name="name" className="clear-button">X</button>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="startDateFilter">task start:</label>
                        <input id="startDateFilter" type="date" name="start" onChange={setFilter} value={filters.get("start")}/>
                        <button type="button" onClick={ev=>this.props.clearFilter(ev)} name="start" className="clear-button">X</button>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="endDateFilter">task finish:</label>
                        <input id="endDateFilter" type="date" name="finish" onChange={setFilter} value={filters.get("finish")}/>
                        <button type="button" onClick={ev=>this.props.clearFilter(ev)} name="finish" className="clear-button">X</button>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="personFilter">task owner:</label>
                        <input id="personFilter" type="text" name="person" onChange={setFilter} value={filters.get("person")}/>
                        <button type="button" onClick={ev=>this.props.clearFilter(ev)} name="person" className="clear-button">X</button>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="departmentFilter">department:</label>
                        <select id="departmentFilter" name="department" onChange={setFilter} value={filters.get("department")}>
                            <option value="">Select...</option>
                            {departmentList || false}
                        </select>
                        <button type="button" onClick={ev=>this.props.clearFilter(ev)} name="department" className="clear-button">X</button>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="statusFilter">status:</label>
                        <select id="statusFilter" name="status" onChange={setFilter} value={filters.get("status")}>
                            <option value="">Select...</option>
                            {statuses || false}
                        </select>
                        <button type="button" onClick={ev=>this.props.clearFilter(ev)} name="status" className="clear-button">X</button>
                    </div>
                    <button type="button" onClick={ev=>this.props.clearFilter(ev)} name="all" className="clear-all-button">clear all</button>
                </div>
            </section>
        );
    }
}

export default Filters;

