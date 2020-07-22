import React from 'react';
import CourseContent from './CourseContent.js'
import CourseDisplay from './CourseDisplay.js'
import { Heading, Flex, Input, Button, Grid, Text, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import 'typeface-source-code-pro';
import './App.css';
import Typewriter from 'typewriter-effect';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {courses: []};
  }

  getCourses = async function() {
    const url = 'https://commoncourse-files.s3.amazonaws.com/valid_courses.txt';

    const response = await fetch(url);
    const responseText = await response.text();
    const rawCourses = responseText.split('\n').filter(st => st.length >= 1);
  
    let courses = [];
  
    for (let i = 0; i < rawCourses.length; i += 3) {
      console.log(i)
      courses.push(new CourseContent(rawCourses[i], rawCourses[i + 2], rawCourses[i + 1]));
    }
  
    return courses;
  }

  componentDidMount() {
    this.getCourses()
      .then(courseList => {this.setState({courses: courseList});});
  }

  render() {
    return (
      <div className="App">         
      <Flex direction="column" mb="20px">
      <Heading as="h1" fontSize={["40px", "40px", "60px", "80px"]} marginTop="1rem" fontFamily="Source Code Pro" fontStyle="italic"><Typewriter
            onInit={(typewriter) => {
              typewriter.typeString('commoncourse')
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}

            options={{
              loop: true,
            }}
          /> </Heading>
        <Text fontFamily="Source Code Pro" fontStyle="italic" fontSize={["15px", "15px", "20px", "20px"]}>your guide to selecting HKU CCs</Text>
        
        <Tabs isFitted variant="unstyled" mt="4">
          <TabList>
            <Tab _selected={{ color: "#004777", fontWeight: "bold" }} fontSize={["20px", "20px", "25px", "25px"]}>Search for courses</Tab>
            <Tab _selected={{ color: "#004777", fontWeight: "bold"  }} fontSize={["20px", "20px", "25px", "25px"]}>How it works</Tab>
            <Tab _selected={{ color: "#004777", fontWeight: "bold"  }} fontSize={["20px", "20px", "25px", "25px"]}>About</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Flex direction="row" px={["2rem", "2rem", "2rem", "5rem"]} py="2rem">
              <Input flexGrow={4} placeholder="Enter query" mx="1rem"/>
              <Button variantColor="blue" size="md" mr="1rem">Search</Button>
            </Flex>

            <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]} columnGap="2vw" rowGap="2vh" px={["2rem", "2rem", "2rem", "5rem"]}>
            {this.state.courses.map((value) => {
              return (<CourseDisplay course = {value}/>);
            })} 
            </Grid>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
      </Flex> 
        
        
        
      </div>
    );
  }
}

export default App;
