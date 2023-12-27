import { Box, Center, Container, createStyles, Flex, Paper, SegmentedControl, Title } from "@mantine/core";
import { IconCode, IconExternalLink, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import HighAccessChartControl from "./HighAccessLevelControl";
import LowAcessChartControl from './LowAcessChartControl';

const useStyles = createStyles((themes) => ({
    statsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '100%',
        minHeight: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '100%',
        minHeight: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartOuterContainer: {
        padding: '20px',
        margin: '20px',
        width: 'fit-content',
        height: 'fit-content',
        display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // border: '1px solid black',
    },
    chartInnerContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chart: {
        width: '100%',
        height: '100%',
    },
}));



const Charts_v2 = ({ projectId, projectInfo, setProjectInfo, userInfo }) => {

    const { classes, } = useStyles();
    const [ChartAccess, setChartAccess] = useState('Low');

    // console.log(userInfo, 'userInfo from charts_v2');
    console.log(projectInfo, 'projectInfo from charts_v2');



    return (
        <>
            <Flex p={'20px'} direction={'column'}>
                {/* <Flex justify={'end'}>
                    <SegmentedControl
                        size={'sm'}
                        w={'300px'}
                        value={ChartAccess}
                        onChange={(value) => setChartAccess(value)}
                        data={[
                            {
                                value: 'Low',
                                label: (
                                    <Center>
                                        <IconEye size="1rem" />
                                        <Box ml={10}>Preview</Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 'Medium',
                                label: (
                                    <Center>
                                        <IconCode size="1rem" />
                                        <Box ml={10}>Code</Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 'High',
                                label: (
                                    <Center>
                                        <IconExternalLink size="1rem" />
                                        <Box ml={10}>Export</Box>
                                    </Center>
                                ),
                            },
                        ]}
                    />
                </Flex> */}
                {
                    ChartAccess === 'High' && (
                        <>
                            <LowAcessChartControl
                                projectInfo={projectInfo}
                                userInfo={userInfo}
                            />
                            {/* <HighAccessChartControl
                                projectInfo={projectInfo}
                                userInfo={userInfo}
                            /> */}
                        </>
                    )
                }
                {/* {
                    ChartAccess === 'Medium' && (
                        <>
                            <LowAcessChartControl
                                projectInfo={projectInfo}
                                userInfo={userInfo}
                            />
                        </>
                    )
                } */}
                {
                    ChartAccess === 'Low' && (
                        <>
                            <LowAcessChartControl
                                projectInfo={projectInfo}
                                userInfo={userInfo}
                            />
                            {/* <HighAccessChartControl
                                projectInfo={projectInfo}
                                userInfo={userInfo}
                            /> */}
                        </>
                    )
                }
            </Flex>
        </>
    );

}

export default Charts_v2;