class PowerDate{
    
    /**
     * 
     * @param {*} tasks 
     */
    static getMinTaskTimeValue (tasks) {
        return tasks.map(task => task.start)
            .map(date => this.dateToMilliseconds(date))
            .reduce((firstDate, secondDate) => firstDate < secondDate ? firstDate : secondDate);
    }
    /**
     * 
     * @param {*} tasks 
     */
    static getMaxTaskTimeValue (tasks) {
        return tasks.map(task => task.end)
            .map(date => this.dateToMilliseconds(date))
            .reduce((firstDate, secondDate) => firstDate > secondDate ? firstDate : secondDate);
    }

    /**
     * 
     * @param {*} stringDate 
     */
    static dateToMilliseconds (stringDate) {
        const formatedDete = stringDate.split(".").reverse().join("/");
        return Date.parse(formatedDete);
    }

    static getSimplifyDate (date) {
        const dateObject = new Date(date);
        return dateObject.toISOString().substring(0,10);
    }

}

export default PowerDate;