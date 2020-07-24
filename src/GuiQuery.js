import React, { useState, useEffect } from 'react';
import { FormLabel, RadioGroup, Radio, FormHelperText, Box, Grid, IconButton, Flex, Divider, Select, NumberInput,NumberInputField, Text,Heading, Collapse, CloseButton } from "@chakra-ui/core";

const GuiQuery = ({ index, close, updateParam, params, valid }) => {
    return (
        <Box mb="2vh" backgroundColor="#FFFFFF"  boxShadow="4px 5px 5px 0px #BFBFBF" borderColor="#000000" borderWidth="1px" borderRadius="lg" mx={["2rem", "2rem", "2rem", "5rem"]} px={["1.5rem", "1.5rem", "1.5rem", "3.75rem"]} py={["0.5rem", "0.5rem", "0.5rem", "1.25rem"]}>
           
            <Grid templateColumns="3fr 100fr 1fr">

                <Heading alignSelf="center" as="h1" fontSize="60px" mr="5px">{index + 1}</Heading>
            
                <Flex direction="column">
                <Heading>Course Filter</Heading>
            <Text>All courses that satisfy these options will be shown. Leave any option blank to indicate no preference.</Text>
            <Divider></Divider>
                <Grid templateColumns={["1fr", "1fr", "1fr", "2fr 1fr 1fr"]}  rowGap="5px" columnGap={["10px", "10px", "10px", "0px"]}>
                <Flex direction = "column" justifyContent="space-between">
                <FormLabel as="legend">Area of Inquiry:</FormLabel>
                <RadioGroup isInline onChange={(e) => {updateParam(index, 'area', e.target.value)}} value = {params['area'] || "null"}>
                    
                    <Radio value="st">Science and Technology</Radio>
                    <Radio value="gl">Global Issues</Radio>
                    <Radio value="hu">Humanities</Radio>
                    <Radio value="ch">China</Radio>
                </RadioGroup>
                </Flex>
                
                <Flex direction = "column" justifyContent="space-between">
                <FormLabel as="legend">Semester:</FormLabel>
                {console.log("the semester is")}
                {console.log(params['semester'])}
                <RadioGroup isInline onChange={(e) => {updateParam(index, 'semester', e.target.value)}} value = {params['semester'] || "null"}>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                </RadioGroup>
                </Flex>
                
                <Flex direction = "column" justifyContent="space-between">
                <FormLabel as="legend">Group work:</FormLabel>
                <RadioGroup isInline onChange={(e) => {updateParam(index, 'group', e.target.value)}} value = {params['group'] || "null"}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                </RadioGroup>
                </Flex>
                
                <Flex direction = "column" justifyContent="space-between">
                    
                <FormLabel as="legend">Essay:</FormLabel>
                <RadioGroup isInline onChange={(e) => {updateParam(index, 'essay', e.target.value)}} value = {params['essay'] || "null"}>
                <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                </RadioGroup>
                
                </Flex>
                
                <Flex direction = "column" justifyContent="space-between">
                    <FormLabel as="legend">Field trip:</FormLabel>
                <RadioGroup isInline onChange={(e) => {updateParam(index, 'visit', e.target.value)}} value = {params['visit'] || "null"}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                </RadioGroup>
                
                </Flex>
                
                </Grid>
                <Grid mt="10px" templateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]} columnGap={["20px", "20px", "20px", "0px"]} rowGap="10px">
                    <Flex direction = "column"><Flex justifyContent="flex-start" alignItems="center">
                    <FormLabel as="legend">Coursework percentage:</FormLabel>
                    <Select placeholder="None" width="40%" mr="10px" onChange={(e) => {updateParam(index, 'courseptOp', e.target.value)}} value={params['courseptOp'] || "null"}>
                        <option value="<">Less than</option>
                        <option value="<=">Less than or equal to</option>
                        <option value="===">Equal to</option>
                        <option value=">">Greater than</option>
                        <option value=">=">Greater than or equal to</option>
                    </Select>
                    <NumberInput mr="10px" width="15%"  onChange={(e) => {updateParam(index, 'courseptNum', e)}} value={params['courseptNum'] || ""}><NumberInputField /></NumberInput>
                    <Text mr="10px">%</Text>
                    </Flex></Flex>
                    
                    <Flex direction="column"><Flex justifyContent="flex-start" alignItems="center">
                    <FormLabel as="legend">Study hours:</FormLabel>
                    <Select placeholder="None" width="40%" mr="10px"  onChange={(e) => {updateParam(index, 'hoursOp', e.target.value)}} value={params['hoursOp'] || "null"}>
                        <option value="<">Less than</option>
                        <option value="<=">Less than or equal to</option>
                        <option value="===">Equal to</option>
                        <option value=">">Greater than</option>
                        <option value=">=">Greater than or equal to</option>
                    </Select>
                    <NumberInput mr="10px" width="15%" onChange={(e) => {updateParam(index, 'hoursNum', e)}} value={params['hoursNum'] || ""}><NumberInputField /></NumberInput>
                    <Text>hours</Text>
                    </Flex></Flex>
                    
                </Grid>
                <Collapse isOpen={valid != null && !valid}><Text color="tomato" as="strong">Invalid filter!</Text></Collapse>
                </Flex>
                
                
                <CloseButton size="md" onClick={()=>{close(index)}}/> 
            </Grid>
            
        </Box>
    
    );
};

export default GuiQuery;