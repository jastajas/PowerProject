import React from "react";
import {NavLink} from "react-router-dom";

import Arrow from "../images/arrow.svg";
import './ChartNav.css';

class ChartNav extends React.Component {
    state = {
        isExtended: false
    };

    handleClickButton = () => {
        const isExtended = !this.state.isExtended;
        this.setState({isExtended});
    };

    render() {
        const angleNavArrow = this.state.isExtended ? 90 : 270;

        return (
            <aside className="chartNav">

                <button onClick={this.handleClickButton}>
                    <img
                        src={Arrow}
                        alt=""
                        style={{transform: `rotate(${angleNavArrow}deg)`}}
                    />
                </button>

                <nav style={{width: this.state.isExtended ? "200px" : "0px"}}>
                    <ul>
                        <li>
                            <NavLink className="navElement" to="/kanban"><p>kanban</p></NavLink>
                        </li>
                        <li>
                            <NavLink className="navElement" to="/list"><p>task list</p></NavLink>
                        </li>
                        <li>
                            <NavLink className="navElement" to="/gantt"><p>gantt</p></NavLink>
                        </li>
                        <li>
                            <NavLink className="navElement" to="/holidays"><p>holidays</p></NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        );
    }
}

export default ChartNav;
