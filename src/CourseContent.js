import parse from './Utils.js'

class CourseContent {
    #courseDetails;
    #studyLoad;
    #amtMethods;

    constructor(courseDetailsString, studyLoadString, amtMethodsString) {
        this.#courseDetails = JSON.parse(courseDetailsString);
        this.#studyLoad = JSON.parse(studyLoadString);
        this.#amtMethods = JSON.parse(amtMethodsString);
    }

    get getCourseDetails() {
        return this.#courseDetails;
    }

    get getStudyLoad() {
        return this.#studyLoad;
    }

    get getAmtMethods() {
        return this.#amtMethods;
    }

    satisfiesClause(clause) {
        const key = clause.getKey;
        let operator = clause.getOperator;
        if (operator == '=') operator = '===';
        const value = clause.getValue;
        const activities = Object.keys(this.#studyLoad).join('').toLowerCase() + Object.keys(this.#amtMethods).join('').toLowerCase();
        switch (key) {
            case "area":
                switch (value) {
                    case "st":
                        return this.#courseDetails['Area of Inquiry'] === 'Science and Technology';
                    case "gl":
                        return this.#courseDetails['Area of Inquiry'] === 'Global Issues';
                    case "hu":
                        return this.#courseDetails['Area of Inquiry'] === 'Humanities';
                    case "ch":
                        return this.#courseDetails['Area of Inquiry'] === 'China';
                }
                break;
            case "semester": 
                if (value !== 'both') return this.#courseDetails['Semesters'].includes(value);
                return this.#courseDetails['Semesters'].length === 2;
            case "coursept":
                return parse(`${this.#courseDetails['Coursework Percentage']} ${operator} ${value}`);
            case "hours":
                return parse(`${this.#courseDetails['Study hours']} ${operator} ${value}`);
            case "group":
                return (value === 'yes') == activities.includes('group');
            case "essay":
                return (value === 'yes') == activities.includes('essay');
            case "visit":
                return (value === 'yes') == (activities.includes('trip') || activities.includes('field') || activities.includes('visit'));
        }
    }
}

export default CourseContent;