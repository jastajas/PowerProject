class PowerFilter {

    #task;
    #containName;
    #isTaskOwner;
    #isAfterDate;
    #isBeforeDate;
    #isStatus;
    #isDepartment;


    constructor() {
        this.#task = null;
    }

    /**
     *
     * @param task
     * @returns {PowerFilter}
     */
    setTask(task){
        this.#task = task;

        this.#containName = true;
        this.#isTaskOwner = true;
        this.#isAfterDate = true;
        this.#isBeforeDate = true;
        this.#isStatus = true;
        this.#isDepartment = true;

        return this;
    }

    /**
     *
     * @param keyword
     * @returns {PowerFilter}
     */
    checkName(keyword){

        if(!this.#task) throw new Error("No task provided!");

        this.#containName = !keyword || this.#task.name.toUpperCase().includes(keyword.toUpperCase());

        return this;
    }

    /**
     *
     * @param startDate
     * @returns {PowerFilter}
     */
    checkTaskAfterDate(startDate){
        if(!this.#task) throw new Error("No task provided!");

        this.#isAfterDate = !startDate
            || Date.parse(this.#task.start) >= Date.parse(startDate)
            || Date.parse(this.#task.finish) >= Date.parse(startDate);

        return this;
    }

    /**
     *
     * @param finishDate
     * @returns {PowerFilter}
     */
    checkTaskBeforeDate(finishDate){
        if(!this.#task) throw new Error("No task provided!");

        this.#isBeforeDate = !finishDate
            || Date.parse(this.#task.start) <= Date.parse(finishDate)
            || Date.parse(this.#task.finish) <= Date.parse(finishDate);

        return this;
    }

    /**
     *
     * @param taskOwner
     * @returns {PowerFilter}
     */
    checkTaskOwner(taskOwner){
        if(!this.#task) throw new Error("No task provided!");

        this.#isTaskOwner = !taskOwner
            || (this.#task.assignments
                && this.#task.assignments.findIndex(assignment => assignment.resource
                    && assignment.resource.name
                    && assignment.resource.name.toUpperCase().includes(taskOwner.toUpperCase()))+1);

        return this;
    }

    /**
     *
     * @param department
     * @returns {PowerFilter}
     */
    checkDepartment(department){

        if(!this.#task) throw new Error("No task provided!");

        this.#isDepartment = !department
            || (this.#task.assignments
                && this.#task.assignments.findIndex(assignment => assignment.resource
                    && assignment.resource.department
                    && assignment.resource.department.toUpperCase().includes(department.toUpperCase()))+1);

        return this;
    }

    /**
     *
     * @param status
     * @returns {PowerFilter}
     */
    checkStatus(status){

        if(!this.#task) throw new Error("No task provided!");

        this.#isStatus = !status || this.#task.status.toUpperCase().includes(status.toUpperCase());

        return this
    }

    /**
     *
     * @returns {*}
     */
    filterAll(){

        if(!this.#task) throw new Error("No task provided!");

        return this.#containName && this.#isStatus && this.#isBeforeDate
            && this.#isAfterDate && this.#isTaskOwner && this.#isDepartment;

    }

}

export default PowerFilter;
