import React from 'react';
import CourseContent from '../components/course/CourseContent.js'
import Query from '../components/query/Query.js'
import CourseDisplay from '../components/course/CourseDisplay.js'
import { Heading, Flex, Button, Grid, Text, Collapse, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Link, List, ListItem, ListIcon } from "@chakra-ui/core";
import 'typeface-source-code-pro';
import 'typeface-lato';
import '../styles/App.css';
import { BsEye, BsEyeSlash, BsPlus,BsArrow90DegLeft } from 'react-icons/bs';
import { AiOutlineGithub, AiOutlineInstagram, AiOutlineMail, AiOutlineLinkedin } from 'react-icons/ai';

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
                <Box mt={["10px", "10px", "20px", "20px"]} px={["3rem", "3rem", "3rem", "15rem"]} >
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    exquiro is a website that helps you narrow down your favourite CCs using filters.
                  </Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    {`When you first load the website, exquiro shows you every single Common Core course listed on HKU's website*, along with its various features such as which Area of Inquiry it belongs to, which semester it is offered in, its study load, its assessment methods and so on. To start narrowing down these courses, click on `}
                    <b>Add a new filter</b>
                    {`. In the newly added filter, select all the features you are looking for in your desired CCs:`}
                  </Text>
                  <List spacing="3px" mt="10px" styleType="disc">
                    <ListItem>
                      <b>Area of Inquiry</b> - the area of inquiry you are looking for CCs from
                    </ListItem>
                    <ListItem>
                      <b>Semester</b> - the semester you are looking for CCs from
                    </ListItem>
                    <ListItem>
                      <b>Group work</b> - whether you want group work in your desired CCs or not
                    </ListItem>
                    <ListItem>
                      <b>Essay</b> - whether you want essay writing tasks in your desired CCs or not
                    </ListItem>
                    <ListItem>
                      <b>Field trip</b> - whether you want field trips/visits in your desired CCs or not
                    </ListItem>
                    <ListItem>
                      <b>Delivery mode</b> - whether your desired CCs are delivered in online/mixed/offline mode
                    </ListItem>
                    <ListItem>
                      <b>Coursework percentage</b> - the percentage of coursework you want in your desired CCs: 100% means no exam, while 60% would mean 60% coursework, 40% examination
                    </ListItem>
                    <ListItem>
                      <b>Study hours</b> - the total number of approximate study hours you want in your desired CCs
                    </ListItem>
                  </List>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    You can leave any of these unchanged/blank to indicate no preference. For example, if you do not care about whether your desired CC has group work, leave the <b>Group work</b> selection untouched.
                  </Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    Once you have decided on all your features, scroll down to see all the CCs which fulfill your requested criteria.
                  </Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    You can also add multiple filters - in this case, all courses which fit at least one of your filters will be shown. If you want to add a filter that is almost identical to another filter, you may want to use the <b>Duplicate this filter</b> option, which makes a duplicate of that filter for you to work on.
                  </Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    Should you decide that you no longer want a filter to be applied, click on the <b>X</b> at the top right of the filter to delete it.
                  </Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    If you feel like you have too many filters enabled and that they are cluttering your screen, you can click <b>Hide filters</b> to temporarily hide them, and click <b>Show filters</b> to show your filters again.
                  </Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    If you want to delete all your filters and bring back the full course list, click on <b>Reset to all courses</b>.
                  </Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    * Due to formatting errors on HKU's website, the following courses will not be listed:
                  </Text>
                  <List spacing="3px" mt="10px" styleType="disc">
                    {
                      this.state.improperCourses.map((v) => {
                        return (
                          <ListItem>
                            {v}
                          </ListItem>
                        );
                      })
                    }
                  </List>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" my = "10px">
                    I hope you're able to find your favourite CCs using exquiro!
                  </Text>
                </Box>
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
                <Box mt={["10px", "10px", "20px", "20px"]} px={["3rem", "3rem", "3rem", "15rem"]} >
                  <Heading as="h2" fontSize={["20px", "20px", "25px", "25px"]} fontFamily="Source Code Pro" fontStyle="italic">exquiro</Heading>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" ><i>verb (Latin):</i> to seek out, to search</Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    exquiro is a project I initially developed over the course of a week to help me navigate or even avoid HKU's labyrinth of CC pages before realizing that what I'm doing would probably be helpful for other people as well. It was also a way for me to practice my newly learnt React skills.
                  </Text>
                  <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                    exquiro is entirely open-source: you can find the code for both the scraper as well as the website over <Link isExternal href="https://github.com/exquiro" color="#00b4b4">at GitHub</Link>. Contributions in the form of GitHub issues and pull requests are welcomed. If you're not too familiar with porgramming, shoot me a message with any kind of feedback. I'd love to hear what you think!
                  </Text>
                  <Heading as="h1" fontSize={["20px", "20px", "25px", "25px"]} fontFamily="Lato" mt = "20px">About me</Heading>
                  <Flex>
                    <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato" mt = "10px">
                      I'm Eehit Ray, a sophomore pursuing Computer Science at HKU. I spend most of my free time coding, watching movies, listening to rock and swimming. If you see me on campus, come say hi! Or feel free to reach out to me at:
                    </Text>
                  </Flex>
                  <List spacing="3px" mt="10px">
                    <ListItem>
                        <Flex alignItems="center">
                          <ListIcon icon={AiOutlineMail} color="#343432" size={["20px", "20px", "30px", "30px"]}/>
                          <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato">
                            <Link isExternal href="mailto:eehit@connect.hku.hk" color="#00b4b4">eehit@connect.hku.hk</Link>
                          </Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex alignItems="center">
                          <ListIcon icon={AiOutlineGithub} color="#343432" size={["20px", "20px", "30px", "30px"]}/>
                          <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato">
                            <Link isExternal href="https://github.com/greatblitz982" color="#00b4b4">@greatblitz982</Link>
                          </Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex alignItems="center">
                          <ListIcon icon={AiOutlineInstagram} color="#343432" size={["20px", "20px", "30px", "30px"]}/>
                          <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato">
                            <Link isExternal href="https://www.instagram.com/greatblitz/" color="#00b4b4">@greatblitz</Link>
                          </Text>
                        </Flex>
                    </ListItem>
                    <ListItem>
                        <Flex alignItems="center">
                          <ListIcon icon={AiOutlineLinkedin} color="#343432" size={["20px", "20px", "30px", "30px"]}/>
                          <Text fontSize={["15px", "15px", "18.75px", "18.75px"]} fontFamily="Lato">
                            <Link isExternal href="https://www.linkedin.com/in/eehit-ray-52559b195/" color="#00b4b4">Eehit Ray</Link>
                          </Text>
                        </Flex>
                    </ListItem>
                  </List>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex> 
      </div>
    );
  }
}

export default App;
