import React from 'react';
import { Box, Text, Link, List, ListItem, ListIcon, Heading, Flex } from '@chakra-ui/core';
import { AiOutlineGithub, AiOutlineInstagram, AiOutlineMail, AiOutlineLinkedin } from 'react-icons/ai';

const About = () => {
    return (
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
    );
}

export default About;