import parse from "../../utils/Utils.js";

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

  satisfiesQuery(query) {
    if (Object.keys(query).length === 2 && Object.values(query).includes("")) return false;

    const activities = Object.keys(this.#studyLoad).join("").toLowerCase() + Object.keys(this.#amtMethods).join("").toLowerCase();
      
    let satisfies = true;

    for (const [key, value] of Object.entries(query)) {
      if (key === "courseptOp" || key === "hoursOp") continue;
      if ((key === "courseptNum" && query['courseptOp'].length === 0) || (key === "hoursNum" && query['hoursOp'] .length === 0)) continue;

      switch (key) {

        case "area":
          switch (value) {
            case "st":
              satisfies = satisfies && this.#courseDetails["Area of Inquiry"] === "Science and Technology";
              break;
            case "gl":
              satisfies = satisfies && this.#courseDetails["Area of Inquiry"] === "Global Issues";
              break;
            case "hu":
              satisfies = satisfies && this.#courseDetails["Area of Inquiry"] === "Humanities";
              break;
            case "ch":
              satisfies = satisfies && this.#courseDetails["Area of Inquiry"] === "China";
              break;
          }
          break;

        case "semester":
          if (value !== "both") satisfies = satisfies && this.#courseDetails["Semesters"].includes(value);
          else satisfies = satisfies && this.#courseDetails["Semesters"].length === 2;
          break;

        case "courseptNum":
          satisfies = satisfies && parse(`${this.#courseDetails["Coursework Percentage"]} ${query["courseptOp"]} ${value}`);
          break;

        case "hoursNum":
          satisfies = satisfies && parse(`${this.#courseDetails["Study hours"]} ${query["hoursOp"]} ${value}`);
          break;

        case "group":
          satisfies = satisfies && (value === "yes") == activities.includes("group");
          break;

        case "essay":
          satisfies = satisfies && (value === "yes") == activities.includes("essay");
          break;

        case "visit":
          satisfies = satisfies && (value === "yes") == (activities.includes("trip") || activities.includes("field") || activities.includes("visit"));
          break;
      }
    }

    return satisfies;
  }
}

export default CourseContent;
