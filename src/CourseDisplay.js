import React from 'react';
import { Heading, Flex, Input, Button, Grid, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Link } from "@chakra-ui/core";

class CourseDisplay extends React.Component {
    render() {
        return (
            <Flex flexDirection="column" borderRadius="lg" p={[4, 4, 4, 4, 4]} backgroundColor="#B3DEE2" boxShadow="4px 5px 5px 0px #BFBFBF">
                <Heading mb="10px" fontSize="lg">{this.props.course.courseDetails['Code']}: {this.props.course.courseDetails['Name']}</Heading>
                <Tabs isFitted variant="soft-rounded" variantColor="green">
                <TabList>
                    <Tab>Course Details</Tab>
                    <Tab>Study Load</Tab>
                    <Tab>Assessment Methods</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div class="table" style={{marginTop: "10px"}}>
                        <div class="row header">
                                <div class="cell">Property</div>
                                <div class="cell">Value</div>
                        </div>
                        {Object.keys(this.props.course.courseDetails).map((k, i) => {
                            return (
                            <div class="row">
                                <div class="cell"><b>{k}</b></div>
                                
                                <div class="cell">{ k === 'Link' 
                                ? <Link href={this.props.course.courseDetails[k]} color="blue">{this.props.course.courseDetails[k]}</Link> 
                                : this.props.course.courseDetails[k]}</div>
                            </div>
                            );
                        })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="table" style={{marginTop: "10px"}}>
                        <div class="row header">
                                <div class="cell">Activity</div>
                                <div class="cell">Hours</div>
                        </div>
                        {Object.keys(this.props.course.studyLoad).map((k, i) => {
                            return (
                            <div class="row">
                                <div class="cell"><b>{k}</b></div>
                                <div class="cell">{this.props.course.studyLoad[k]}</div>
                            </div>
                            );
                        })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="table" style={{marginTop: "10px"}}>
                        <div class="row header">
                                <div class="cell">Assessment</div>
                                <div class="cell">Weightage</div>
                        </div>
                        {Object.keys(this.props.course.amtMethods).map((k, i) => {
                            return (
                            <div class="row">
                                <div class="cell"><b>{k}</b></div>
                                <div class="cell">{this.props.course.amtMethods[k]}%</div>
                            </div>
                            );
                        })}
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
                
            </Flex>
             
            
        );
    }
}

export default CourseDisplay;