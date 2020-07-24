import React from "react";
import Slider from "./Slider";
import PowerDate from "../../Service/PowerDate";
import "./Holidays.css";

const getCurrentYear = () =>{
    const today = new Date();
    return today.getFullYear();
}

const extractYear = stringDate =>{
    const day = new Date(stringDate);
    return day.getFullYear();
}

const extractDayNo = stringDate =>{
    const day = new Date(stringDate);
    return day.getDay();
}

const generateAbsenceRiskDate = stringDate =>{
    
    const day = new Date(stringDate);

    if(isNaN(day.getTime())) return "błąd";
    
    let milliNewDate = null;
    const DAILY_MILLISECONDS = 86400000;

    if(day.getDay()===2 || day.getDay()===4)
        milliNewDate = day.getDay() === 2 ? day.getTime() - DAILY_MILLISECONDS : day.getTime() + DAILY_MILLISECONDS;
    
    return milliNewDate ? PowerDate.getSimplifyDate(milliNewDate) : "-"; 

}

const getWeekendColor = dayName => {

    let dayColor = dayName === "Sunday" || dayName === "Saturday" ? "rgb(189, 94, 94)" : "rgb(0, 0, 0)";
    return {color: dayColor};
}

class Holidays extends React.Component {
    state = { 
        selectedYear: getCurrentYear(),
     }

    weekDays = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    handleDecrease = () =>{
        this.setState(prevState=>{
            let {selectedYear} = prevState;
            selectedYear--;

            return {selectedYear};
        })
    } 

    handleIncrease = () => {
        this.setState(prevState=>{
            let {selectedYear} = prevState;
            selectedYear++;

            return {selectedYear};
        })
    } 

    render() { 

        const {selectedYear} = this.state;
        const {holidays} = this.props;


        const tableRows = holidays.filter(holiday => extractYear(holiday.Date) === selectedYear).map((holiday, index) => {
          const dayName = this.weekDays[extractDayNo(holiday.Date)];
          return (<tr key={index}>
            <td>{index + 1}</td>
            <td>{holiday.HolidayName}</td>
            <td>{holiday.Date}</td>
            <td style={getWeekendColor(dayName)}>{dayName}</td>
            <td>{generateAbsenceRiskDate(holiday.Date)}</td>
        </tr>)
        });

        const dates = holidays.map(holiday => holiday.Date);
        const minYear = PowerDate.getMinYearFromDates(dates);
        const maxYear = PowerDate.getMaxYearFromDates(dates);

        return ( <section className="holidays">
                    <Slider selectedValue={selectedYear} startRange={minYear} endRange={maxYear} deacreaseValue={this.handleDecrease} increaseValue={this.handleIncrease}/>
                    <table >
                        <thead>
                            <tr>
                                <th>on</th>
                                <th>holiday</th>
                                <th>date</th>
                                <th>day</th>
                                <th>absence risk</th>
                            </tr>
                        </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
            </table>
                </section>

         );
    }
}
 
export default Holidays;
