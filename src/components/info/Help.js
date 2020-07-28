import React from 'react';
import { Box, Text, List, ListItem } from '@chakra-ui/core';

const Help = ({ improperCourses }) => {
    return (
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
                    <b>Name</b> - the name of the CCs you are looking for; can be just a portion of the name as well
                </ListItem>
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
                    <b>Thematic cluster</b> - which thematic cluster(s) your desired CCs are in
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
                    improperCourses.map((v) => {
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
    );
}

export default Help;
