class CourseContent {
    courseDetails;
    studyLoad;
    amtMethods;

    constructor(courseDetailsString, studyLoadString, amtMethodsString) {
        this.courseDetails = JSON.parse(courseDetailsString);
        this.studyLoad = JSON.parse(studyLoadString);
        this.amtMethods = JSON.parse(amtMethodsString);
    }

    getCourseDetails() {
        return this.courseDetails;
    }

    getStudyLoad() {
        return this.studyLoad;
    }

    getAmtMethods() {
        return this.amtMethods;
    }
}

export default CourseContent;