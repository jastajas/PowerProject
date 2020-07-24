import IncorrectDateError from "../Errors/IncorrectDateError";

class PowerDate{
    
    /**
     * 
     * @param {*} tasks 
     */
    static getMinTaskTimeValue (tasks) {
        return tasks.length && tasks.map(task => task.start)
            .map(date => this.localDateToMilliseconds(date))
            .reduce((firstDate, secondDate) => firstDate < secondDate ? firstDate : secondDate);
    }
    /**
     * 
     * @param {*} tasks 
     */
    static getMaxTaskTimeValue (tasks) {
        return tasks.length && tasks.map(task => task.finish)
            .map(date => this.localDateToMilliseconds(date))
            .reduce((firstDate, secondDate) => firstDate > secondDate ? firstDate : secondDate);
    }

    /**
     * 
     * @param {*} stringDate 
     */
    static localDateToMilliseconds (stringDate) {
        const formatedDete = stringDate.split(".").reverse().join("/");
        return Date.parse(formatedDete);
    }

    /**
     *
     * @param date
     * @returns {string}
     */
    static getSimplifyDate (date) {
        const dateObject = new Date(date);
        return dateObject.toISOString().substring(0,10);
    }

    /**
     *
     * @param date
     * @returns {string}
     */
    static getLocalDate (date) {
        const dateObject = new Date(date);
        return dateObject.toLocaleDateString();
    }

    /**
     *
     * @param dates
     * @returns {*}
     */
    static getMinYearFromDates(dates){
        return dates.map(dateString => {
            let date = new Date(dateString);
            if(isNaN(date.getTime())) throw new IncorrectDateError("Incorrect date format");
            return parseInt(date.getFullYear());
        }).reduce((first,second) => first > second ? second : first);

    }

    /**
     *
     * @param dates
     * @returns {*}
     */
    static getMaxYearFromDates(dates){
        return dates.map(dateString => {
            let date = new Date(dateString);
            if(isNaN(date.getTime())) throw new IncorrectDateError("Incorrect date format");
            return parseInt(date.getFullYear());
        }).reduce((first,second) => first < second ? second : first);

    }

}

export default PowerDate;
