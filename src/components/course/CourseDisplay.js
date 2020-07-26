import React from 'react';
import { Heading, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Link } from "@chakra-ui/core";

const CourseDisplay = ({ course }) => {
  return (
    <Flex flexDirection="column" borderRadius="lg" p={[4, 4, 4, 4, 4]} backgroundColor="#e7d9c6" boxShadow="4px 4px 5px 0px #aaaaaa">
      <Heading mb="10px" fontSize="lg" alignSelf="center" color="#505050"> {course.getCourseDetails['Code']} : {course.getCourseDetails['Name']} </Heading>
      <Tabs isFitted variant="soft-rounded" variantColor="tan">
      <TabList>
        <Tab _selected={{backgroundColor: "#b68d54", color:"#ededed"}} color="#454545">Course Details</Tab>
        <Tab _selected={{backgroundColor: "#b68d54", color:"#ededed"}} color="#454545">Study Load</Tab>
        <Tab _selected={{backgroundColor: "#b68d54", color:"#ededed"}} color="#454545">Assessment Methods</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div class="table" style={{marginTop: "10px"}}>
            <div class="row header">
                <div class="cell">Code</div>
                <div class="cell">{course.getCourseDetails['Code']}</div>
            </div>
          {
            Object.keys(course.getCourseDetails).map((k, i) => {
              if (k === 'Code') return <></>;
              return (
                <div class="row">
                  <div class="cell"><b>{k}</b></div>
                  
                  <div class="cell">
                    { 
                      k === 'Link' 
                      ? <Link href={course.getCourseDetails[k]} color="blue"> {course.getCourseDetails[k]} </Link> 
                      : k === 'Semesters' ? course.getCourseDetails[k].join(' and ')
                                          : course.getCourseDetails[k]
                    }
                  </div>
                </div>
              );
            })
          }
          </div>
        </TabPanel>
        <TabPanel>
          <div class="table" style={{marginTop: "10px"}}>
          <div class="row header">
              <div class="cell">Activity</div>
              <div class="cell">Hours</div>
          </div>
          {
            Object.keys(course.getStudyLoad).map((k, i) => {
              return (
                <div class="row">
                  <div class="cell"><b> {k} </b></div>
                  <div class="cell"> {course.getStudyLoad[k]} </div>
                </div>
              );
            })
          }
          </div>
        </TabPanel>
        <TabPanel>
          <div class="table" style={{marginTop: "10px"}}>
          <div class="row header">
              <div class="cell">Assessment</div>
              <div class="cell">Weightage</div>
          </div>
          {
            Object.keys(course.getAmtMethods).map((k, i) => {
              return (
                <div class="row">
                  <div class="cell"><b>{k}</b></div>
                  <div class="cell">{course.getAmtMethods[k]}%</div>
                </div>
              );
            })
          }
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </Flex>
  );
}


export default CourseDisplay;