import React from 'react';
import CourseContent from '../components/course/CourseContent.js'
import Query from '../components/query/Query.js'
import CourseDisplay from '../components/course/CourseDisplay.js'
import { Heading, Flex, Button, Grid, Text, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import 'typeface-source-code-pro';
import '../styles/App.css';
import Typewriter from 'typewriter-effect';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {courses: [], queries: [], filteredCourses: [], showQueries: true};
    this.deleteVal = this.deleteVal.bind(this);
    this.updateParam = this.updateParam.bind(this);
  }

  getCourses = async function() {
    const url = 'https://commoncourse-files.s3.amazonaws.com/valid_courses.txt';

    const response = await fetch(url);
    const responseText = await response.text();
    const rawCourses = responseText.split('\n').filter(st => st.length >= 1);
  
    let courses = [];
  
    for (let i = 0; i < rawCourses.length; i += 3) {
      courses.push(new CourseContent(rawCourses[i], rawCourses[i + 2], rawCourses[i + 1]));
    }
  
    return courses;
  }

  componentDidMount() {
    this.getCourses()
      .then(courseList => {this.setState({courses: courseList, filteredCourses: courseList});});
  }

  deleteVal(i) {
    const tempQueries = this.state.queries.filter((el, ind) => {return ind !== i});
    this.setState({queries: tempQueries});
    this.updateCourses(tempQueries);
  }

  updateParam(i, param, value) {
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
    })});
  }

  render() {
    return (
      <div className="App">         
        <Flex direction="column" mb="20px" justifyContent="space-between" alignItems="center">
          <Heading as="h1" fontSize={["40px", "40px", "60px", "80px"]} marginTop="1rem" fontFamily="Source Code Pro" fontStyle="italic">
            <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString('commoncourse')
                    .pauseFor(2500)
                    .deleteAll()
                    .start();
                }}

                options={{
                  loop: true,
                }}
              /> 
          </Heading>
          <Text fontFamily="Source Code Pro" fontStyle="italic" fontSize={["15px", "15px", "20px", "20px"]}>your guide to selecting HKU CCs</Text>
          
          <Tabs isFitted variant="unstyled" mt="4" defaultIndex = {1} alignSelf="stretch">
            <TabList>
              <Tab _selected={{ color: "#004777", fontWeight: "bold"  }} fontSize={["20px", "20px", "25px", "25px"]}>How it works</Tab>
              <Tab _selected={{ color: "#004777", fontWeight: "bold" }} fontSize={["20px", "20px", "25px", "25px"]}>Search for courses</Tab>
              <Tab _selected={{ color: "#004777", fontWeight: "bold"  }} fontSize={["20px", "20px", "25px", "25px"]}>About</Tab>
            </TabList>

            <TabPanels>
              <TabPanel alignSelf="flex-start">
                <Text textAlign="left" px={["2rem", "2rem", "2rem", "5rem"]}>two!</Text>
              </TabPanel>

              <TabPanel>
                <Flex direction="row" px={["2rem", "2rem", "2rem", "5rem"]} py="1rem" justifyContent="space-evenly">
                  <Button variantColor="blue" size="md" isDisabled = {!this.state.showQueries} onClick = {
                    () => {
                      this.setState({queries: this.state.queries.concat([{'params': {}, 'valid': null}])});
                      this.updateCourses(this.state.queries);
                    }
                  }>Add a new query</Button>
                  <Button variantColor="blue" size="md" onClick={
                    () => {
                      this.setState({showQueries: !this.state.showQueries});
                    }
                  }>{this.state.showQueries ? "Hide" : "Show"} queries</Button>
                  <Button variantColor="blue" size="md" isDisabled = {this.state.queries.length === 0} onClick={
                    () => {
                      this.setState({filteredCourses: this.state.courses, queries: []});
                    }
                  }>Reset to all courses</Button>
                </Flex>

                <Collapse isOpen={this.state.showQueries}>
                  {
                    this.state.queries.map((v, i) => {
                      return <Query key = {i} index={i} close={this.deleteVal} updateParam={this.updateParam} params={v['params']} valid={v['valid']}/>
                    })
                  }
                </Collapse>

                <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]} columnGap="2vw" rowGap="2vh" px={["2rem", "2rem", "2rem", "5rem"]}>
              
                  {
                    this.state.filteredCourses.map((value) => {
                      return <CourseDisplay course = {value}/>;
                    })
                  } 
                  {this.state.queries.length === 0 ? <Text>Try adding some queries!</Text> : <></>}
                  {this.state.queries.length && this.state.filteredCourses.length === 0 ? <Text>There are no such courses.</Text> : <></>}
                </Grid>
              </TabPanel>

              <TabPanel>
                
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex> 
      </div>
    );
  }
}

export default App;
