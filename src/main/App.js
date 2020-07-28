import React from 'react';
import CourseContent from '../components/course/CourseContent.js'
import Query from '../components/query/Query.js'
import CourseDisplay from '../components/course/CourseDisplay.js'
import About from '../components/info/About.js'
import Help from '../components/info/Help.js'
import { Heading, Flex, Button, Grid, Text, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import 'typeface-source-code-pro';
import 'typeface-lato';
import '../styles/App.css';
import { BsEye, BsEyeSlash, BsPlus,BsArrow90DegLeft } from 'react-icons/bs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {courses: [], queries: [], filteredCourses: [], improperCourses: [], showQueries: true, justReset: true, isSmall: window.innerWidth < 700 };
    this.deleteVal = this.deleteVal.bind(this);
    this.updateParam = this.updateParam.bind(this);
    this.duplicateFilter = this.duplicateFilter.bind(this);
    this.updateIsSmall = this.updateIsSmall.bind(this);
  }

  getCourses = async function() {
    let courses = [[], []];
    
    const properUrl = 'https://commoncourse-files.s3.amazonaws.com/valid_courses.txt';
    const improperUrl = 'https://commoncourse-files.s3.amazonaws.com/invalid_courses.txt';

    const properResponse = await fetch(properUrl);
    const properResponseText = await properResponse.text();
    const rawProperCourses = properResponseText.split('\n').filter(st => st.length >= 1);
  
    for (let i = 0; i < rawProperCourses.length; i += 3) {
      courses[0].push(new CourseContent(rawProperCourses[i], rawProperCourses[i + 2], rawProperCourses[i + 1]));
    }

    const improperResponse = await fetch(improperUrl);
    const improperResponseText = await improperResponse.text();
    const rawImroperCourses = improperResponseText.split('\n').filter(st => st.length >= 1);

    courses[1] = [...rawImroperCourses];

    console.log(courses[1]);
  
    return courses;
  }

  componentDidMount() {
    this.getCourses()
      .then(courseList => {this.setState({courses: courseList[0], filteredCourses: courseList[0], improperCourses: courseList[1]});});
    this.updateIsSmall();
    window.addEventListener("resize", this.updateIsSmall);
  }

  componentWillMount() {
    window.removeEventListener("resize", this.updateIsSmall);
  }

  deleteVal(i) {
    const tempQueries = this.state.queries.filter((el, ind) => {return ind !== i});
    this.setState({queries: tempQueries});
    this.updateCourses(tempQueries);
  }

  duplicateFilter(i) {
    const tempQueries = this.state.queries.concat([JSON.parse(JSON.stringify(this.state.queries[i]))]);
    this.setState({queries: tempQueries});
    this.updateCourses(tempQueries);
  }

  updateParam(i, param, value) {
    console.log(param);
    console.log(value);
    let tempQuery = [...this.state.queries];
    tempQuery[i]['params'][param] = value;

    if (((tempQuery[i]['params']['courseptOp'] ? 1 : 0) ^ (tempQuery[i]['params']['courseptNum'] ? 1 : 0)) || ((tempQuery[i]['params']['hoursOp'] ? 1 : 0) ^ (tempQuery[i]['params']['hoursNum'] ? 1 : 0))) {
      tempQuery[i]['valid'] = false;
    }
    else tempQuery[i]['valid'] = true;

    this.setState({queries: tempQuery});
    this.updateCourses(tempQuery);
  }

  updateCourses(updatedQueryList) {
    this.setState({filteredCourses: this.state.courses.filter((course) => {
      let satisfies = false;

      updatedQueryList.some((query) => {
        if (query['valid']) satisfies = satisfies || course.satisfiesQuery(query['params']);
        return satisfies;
      })

      return satisfies;
    }), justReset: false});
  }

  updateIsSmall() {
    //Avoid unnecessary expensive setState call
    if (this.state.isSmall === (window.innerWidth < 700)) return;
    this.setState({ isSmall: !this.state.isSmall });
  }

  render() {
    return (
      <div className="App">         
        <Flex direction="column" mb="20px" justifyContent="space-between" alignItems="center">
          <Heading as="h1" fontSize={["40px", "40px", "60px", "80px"]} marginTop="1rem" fontFamily="Source Code Pro" fontStyle="italic" color="#e85a4f">
            exquiro
          </Heading>
          <Text fontFamily="Source Code Pro" fontStyle="italic" fontSize={["15px", "15px", "20px", "20px"]} color="#e89074"><b>your guide to selecting HKU CCs</b></Text>
          
          <Tabs isFitted variant="unstyled" mt="4" defaultIndex = {1} alignSelf="stretch">
            <TabList alignSelf="stretch">
              <Tab _selected={{ fontWeight: "bold", backgroundColor: "#e9695d" }} fontSize={["15px", "15px", "20px", "20px"]} color="#ffffff" backgroundColor="#ee8a81" ><Text px={["0px", "0px", "0px", "0px"]}>How to use</Text></Tab>
              <Tab _selected={{ fontWeight: "bold", backgroundColor: "#e9695d" }} fontSize={["15px", "15px", "20px", "20px"]} color="#ffffff" backgroundColor="#ee8a81" ><Text px={["0px", "0px", "0px", "0px"]}>Search for courses</Text></Tab>
              <Tab _selected={{ fontWeight: "bold", backgroundColor: "#e9695d" }} fontSize={["15px", "15px", "20px", "20px"]} color="#ffffff" backgroundColor="#ee8a81" ><Text px={["0px", "0px", "0px", "0px"]}>About</Text></Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Help improperCourses={this.state.improperCourses} />
              </TabPanel>

              <TabPanel>
                <Flex direction={["column", "column", "column", "row"]} px={["2rem", "2rem", "2rem", "15rem"]} py="1rem" justifyContent="space-between">
                  <Button backgroundColor="#E0CFB800" _hover={{backgroundColor: "#C8A97E"}} size="md" mb={["5px", "5px", "0px", "0px"]} leftIcon={BsPlus} isDisabled = {!this.state.showQueries} onClick = {
                    () => {
                      this.setState({queries: this.state.queries.concat([{'params': {}, 'valid': null}])});
                      this.updateCourses(this.state.queries);
                    }
                  }><Text fontSize="lg">Add a new filter</Text></Button>
                  
                  <Button backgroundColor="#E0CFB800" _hover={{backgroundColor: "#C8A97E"}} size="md" mb={["5px", "5px", "0px", "0px"]} leftIcon={this.state.showQueries ? BsEyeSlash : BsEye} isDisabled = {this.state.queries.length === 0} onClick={
                    () => {
                      this.setState({showQueries: !this.state.showQueries});
                    }
                  }><Text fontSize="lg">{this.state.showQueries ? "Hide" : "Show"} filters</Text></Button>
                  <Button backgroundColor="#E0CFB800" _hover={{backgroundColor: "#C8A97E"}} size="md" mb={["5px", "5px", "0px", "0px"]} leftIcon={BsArrow90DegLeft} isDisabled = {this.state.justReset} onClick={
                    () => {
                      this.setState({filteredCourses: this.state.courses, queries: [], showQueries: true, justReset: true});
                    }
                  }><Text fontSize="lg">Reset to all courses</Text></Button>
                </Flex>

                <Collapse isOpen={this.state.showQueries}>
                  {
                    this.state.queries.map((v, i) => {
                      return <Query key = {i} index={i} close={this.deleteVal} updateParam={this.updateParam} duplicate={this.duplicateFilter} params={v['params']} valid={v['valid']}/>
                    })
                  }
                </Collapse>

                <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]} columnGap="2vh" rowGap="2vh" px={["2rem", "2rem", "2rem", "5rem"]}>
              
                  {
                    this.state.filteredCourses.map((value) => {
                      return <CourseDisplay course = {value} isSmall = {this.state.isSmall}/>;
                    })
                  } 

                </Grid>

                {this.state.queries.length === 0 ? <Text fontSize={["20px", "20px", "25px", "25px"]} textAlign="center" mb="10px">Try adding some queries, or check out the 'How it works' section if you need help!</Text> : <></>}
                {this.state.queries.length && this.state.filteredCourses.length === 0 ? <Text fontSize={["20px", "20px", "25px", "25px"]} textAlign="center" mb="10px">There are no courses that satisfy these filters.</Text> : <></>}
              </TabPanel>

              <TabPanel>
                <About />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex> 
      </div>
    );
  }
}

export default App;
