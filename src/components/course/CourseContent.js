import parse from "../../utils/Utils.js";

class CourseContent {
  #courseDetails;
  #studyLoad;
  #amtMethods;

  constructor(courseDetailsString, studyLoadString, amtMethodsString) {
    this.#courseDetails = JSON.parse(courseDetailsString);
    this.#studyLoad = JSON.parse(studyLoadString);
    this.#amtMethods = JSON.parse(amtMethodsString);

    console.log(this.#courseDetails);
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
      
    let satisfies = null;

    for (const [key, value] of Object.entries(query)) {
      if (satisfies === false) return false;

      if (key === "name" && value.trim().length === 0) continue;
      if (key === "courseptOp" || key === "hoursOp") continue;
      if ((key === "courseptNum" && query['courseptOp'].length === 0) || (key === "hoursNum" && query['hoursOp'].length === 0)) continue;

      if (satisfies === null) satisfies = true;

      switch (key) {

        case "name":
          satisfies = satisfies && this.#courseDetails["Name"].toLowerCase().includes(value.toLowerCase());
          break;

        case "area":
          satisfies = satisfies && this.#courseDetails["Code"].slice(2, 4).toLowerCase() === value;
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

        case "delivery":
          satisfies = satisfies && value === this.#courseDetails["Delivery mode"].toLowerCase();
          break;

        case "cluster":
          if (value === 'both') satisfies = satisfies && this.#courseDetails["Thematic cluster"].length === 2;
          else satisfies = satisfies && this.#courseDetails["Thematic cluster"].includes(value.toUpperCase());
          break;
      }
    }

    return satisfies === null ? false : satisfies;
  }
}

export default CourseContent;
