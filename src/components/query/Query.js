import React from 'react';
import { FormLabel, Input, RadioGroup, Radio, Box, Grid, Flex, Divider, Select, NumberInput, NumberInputField, Text,Heading, Collapse, IconButton, Tooltip } from "@chakra-ui/core";

const Query = ({ index, close, updateParam, duplicate, params, valid }) => {
  return (
    <Box mb="2vh" backgroundColor="#d4bc9b"  boxShadow="4px 4px 5px 0px #aaaaaa" borderRadius="lg" mx={["2rem", "2rem", "2rem", "5rem"]} pr={["0.75rem", "0.75rem", "0.75rem", "0.75rem"]} py={["0.5rem", "0.5rem", "0.5rem", "1.25rem"]}>
      <Grid templateColumns="3fr 100fr 1fr" >
        <Heading alignSelf="center" as="h1" color="#343432" fontSize="60px" px={["0.2rem", "0.2rem", "0.2rem", "1rem"]}>{index + 1}</Heading>
        <Flex direction="column">
          <Heading color="#343432">Course Filter</Heading>
          <Text color="#494846">All courses that satisfy these options will be shown. Leave any option blank to indicate no preference.</Text>
          <Divider></Divider>
          <Flex direction="column" justifyContent="space-between" mb="5px">
            <Flex alignItems={["flex-start", "flex-start", "flex-start", "center"]} direction={["column", "column", "column", "row"]}>
              <FormLabel color="#494846"><b>Course name:</b></FormLabel>
              <Input width={["100%", "100%", "100%", "90%"]} onChange={(e) => {updateParam(index, 'name', e.target.value)}} value = {params['name'] || ""}></Input>
            </Flex>
          </Flex>
          <Grid templateColumns={["1fr", "1fr", "1fr", "2fr 1fr 1fr"]}  rowGap="5px" columnGap={["10px", "10px", "10px", "0px"]}>
            <Flex direction = "column" justifyContent="space-between">
              <FormLabel  color="#494846" as="legend"><b>Area of Inquiry:</b></FormLabel>
              <RadioGroup isInline onChange={(e) => {updateParam(index, 'area', e.target.value)}} value = {params['area'] || "null"}>
                <Radio value="st" color="#494846">Science and Technology</Radio>
                <Radio value="gl" color="#494846">Global Issues</Radio>
                <Radio value="hu" color="#494846">Humanities</Radio>
                <Radio value="ch" color="#494846">China</Radio>
              </RadioGroup>
            </Flex>
          
            <Flex direction = "column" justifyContent="space-between">
              <FormLabel as="legend" color="#494846"><b>Semester:</b></FormLabel>
              <RadioGroup isInline onChange={(e) => {updateParam(index, 'semester', e.target.value)}} value = {params['semester'] || "null"}>
                <Radio value="1" color="#494846">1</Radio>
                <Radio value="2" color="#494846">2</Radio>
              </RadioGroup>
            </Flex>
            
            <Flex direction = "column" justifyContent="space-between">
              <FormLabel as="legend" color="#494846"><b>Group work:</b></FormLabel>
              <RadioGroup isInline onChange={(e) => {updateParam(index, 'group', e.target.value)}} value = {params['group'] || "null"}>
                <Radio value="yes" color="#494846">Yes</Radio>
                <Radio value="no" color="#494846">No</Radio>
              </RadioGroup>
            </Flex>
            
            <Flex direction = "column" justifyContent="space-between">
              <FormLabel as="legend" color="#494846"><b>Essay:</b></FormLabel>
              <RadioGroup isInline onChange={(e) => {updateParam(index, 'essay', e.target.value)}} value = {params['essay'] || "null"}>
                <Radio value="yes" color="#494846">Yes</Radio>
                <Radio value="no" color="#494846">No</Radio>
              </RadioGroup>
            </Flex>
            
            <Flex direction = "column" justifyContent="space-between">
              <FormLabel as="legend" color="#494846"><b>Field trip:</b></FormLabel>
              <RadioGroup isInline onChange={(e) => {updateParam(index, 'visit', e.target.value)}} value = {params['visit'] || "null"}>
                <Radio value="yes" color="#494846">Yes</Radio>
                <Radio value="no" color="#494846">No</Radio>
              </RadioGroup>
            </Flex>

            <Flex direction = "column" justifyContent="space-between">
              <FormLabel as="legend" color="#494846"><b>Delivery mode:</b></FormLabel>
              <RadioGroup isInline onChange={(e) => {updateParam(index, 'delivery', e.target.value)}} value = {params['delivery'] || "null"}>
                <Radio value="online" color="#494846">Online</Radio>
                <Radio value="mixed" color="#494846">Mixed</Radio>
                <Radio value="offline" color="#494846">Offline</Radio>
              </RadioGroup>
            </Flex>

            <Flex direction = "column" justifyContent="space-between">
              <FormLabel as="legend" color="#494846"><b>Thematic cluster:</b></FormLabel>
              <RadioGroup isInline onChange={(e) => {updateParam(index, 'cluster', e.target.value)}} value = {params['cluster'] || "null"}>
                <Radio value="scce" color="#494846">SCCE</Radio>
                <Radio value="tqm" color="#494846">TQM</Radio>
                <Radio value="both" color="#494846">Both</Radio>
              </RadioGroup>
            </Flex>
        
          </Grid>
          <Grid mt="10px" templateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]} columnGap={["20px", "20px", "20px", "0px"]} rowGap="10px">
            <Flex direction = "column">
              <Flex direction={["column", "column", "row", "row"]} justifyContent="flex-start" alignItems={["start", "start", "center", "center"]}>
                <FormLabel as="legend" color="#494846"><b>Coursework percentage:</b></FormLabel>
                <Select placeholder="None" width={["100%", "100%", "40%", "40%"]} mr="10px" onChange={(e) => {updateParam(index, 'courseptOp', e.target.value)}} value={params['courseptOp'] || "null"}>
                  <option value="<" color="#494846">Less than</option>
                  <option value="<=" color="#494846">Less than or equal to</option>
                  <option value="===" color="#494846">Equal to</option>
                  <option value=">" color="#494846">Greater than</option>
                  <option value=">=" color="#494846">Greater than or equal to</option>
                </Select>
                <NumberInput mr="10px"width={["100%", "100%", "15%", "15%"]} onChange={(e) => {updateParam(index, 'courseptNum', e)}} value={params['courseptNum'] || ""}><NumberInputField /></NumberInput>
                <Text mr="10px" color="#494846">%</Text>
              </Flex>
            </Flex>
            
            <Flex direction="column">
              <Flex direction={["column", "column", "row", "row"]} justifyContent="flex-start" alignItems={["start", "start", "center", "center"]}>
                <FormLabel as="legend" color="#494846"><b>Study hours:</b></FormLabel>
                <Select placeholder="None" width={["100%", "100%", "40%", "40%"]} mr="10px"  onChange={(e) => {updateParam(index, 'hoursOp', e.target.value)}} value={params['hoursOp'] || "null"}>
                  <option value="<" color="#494846">Less than</option>
                  <option value="<=" color="#494846">Less than or equal to</option>
                  <option value="===" color="#494846">Equal to</option>
                  <option value=">" color="#494846">Greater than</option>
                  <option value=">=" color="#494846">Greater than or equal to</option>
                </Select>
                <NumberInput mr="10px" width={["100%", "100%", "15%", "15%"]} onChange={(e) => {updateParam(index, 'hoursNum', e)}} value={params['hoursNum'] || ""}><NumberInputField /></NumberInput>
                <Text>hours</Text>
              </Flex>
            </Flex>
          </Grid>
          <Collapse isOpen={valid != null && !valid} mt="10px"><Text color="tomato" as="strong">Invalid filter! If you wish to specify the coursework percentage and/or the study hours, make sure to choose an option from the dropdown and also fill in the percentage/number of hours. </Text></Collapse>
        </Flex>
        <Box pr={["15px", "15px", "15px", "15px"]} alignSelf="start">
          <Tooltip hasArrow label="Delete this filter" placement="left"><IconButton variant="ghost" color="#7c7c7c" fontSize="md" icon="close" onClick={() => {close(index)}}/></Tooltip> 
          <Tooltip hasArrow label="Duplicate this filter" placement="left"><IconButton variant="ghost" color="#7c7c7c" fontSize="2xl" icon="copy" onClick={() => {duplicate(index)}}/></Tooltip>
        </Box>
      </Grid> 
    </Box>
  );
};

export default Query;
