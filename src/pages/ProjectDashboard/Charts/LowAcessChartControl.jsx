import { Box, Center, Container, createStyles, Flex, Paper, SegmentedControl, Title } from "@mantine/core";
import StatsChart from "./StatsChart";
import ChartContainer from './ChartContainer';
import UserInfoTable from "../../AdminPortal/UserInfoTable";
import { useEffect, useState } from "react";

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

const LowAcessChartControl = ({ projectInfo, userInfo }) => {

    const { classes, } = useStyles();
    console.log(projectInfo, 'projectInfo from LowAcessChartControl');
    const [memberList, setMemberList] = useState([]);


    //get the high access members and medium access members and low members data from projectInfo

    const getMembersData = () => {
        const highAccessMembers = projectInfo.projectHighAccessMembers;
        const mediumAccessMembers = projectInfo.projectMediumAccessMembers;
        const lowAccessMembers = projectInfo.projectLowAccessMembers;

        const allMembers = [...highAccessMembers, ...mediumAccessMembers, ...lowAccessMembers];

        setMemberList(allMembers);
    }

    useEffect(() => {
        getMembersData();

    }, [projectInfo]);


    const projectTaskCountByPriority = {
        'High': 0,
        'Medium': 0,
        'Low': 0,
        'Choose Priority': 0,
    };

    const projectTaskCountByStatus = {
        'In Progress': 0,
        'Stuck': 0,
        'Backlog': 0,
        'Done': 0,
        'Choose Status': 0,
    };

    const projectCompletionCount = {
        'Completed': 0,
        'Not Completed': 0,
    };

    const projectTaskCount = {
        'Total Tasks': 0,
        'Total Sections': 0,
        'Total Members': 0,
    };

    const projectTaskCountBySection = {

    };

    const projectTaskCountByUser = {

    };

    const projectTaskListByPriority = {
        'High': {
            'completed': 0,
            'not-completed': 0,
            'total': 0,
        },
        'Medium': {
            'completed': 0,
            'not-completed': 0,
            'total': 0,
        },
        'Low': {
            'completed': 0,
            'not-completed': 0,
            'total': 0,
        },
        'Choose Priority': {
            'completed': 0,
            'not-completed': 0,
            'total': 0,
        },
    };



    const fillTheData = () => {
        projectInfo.projectHighAccessMembers.forEach((member) => {
            projectTaskCount['Total Members'] += 1;
            projectTaskCountByUser[member.userName] = 0;
        }
        );
        projectInfo.projectMediumAccessMembers.forEach((member) => {
            projectTaskCount['Total Members'] += 1;
            projectTaskCountByUser[member.userName] = 0;
        });
        projectInfo.projectLowAccessMembers.forEach((member) => {
            projectTaskCount['Total Members'] += 1;
            projectTaskCountByUser[member.userName] = 0;
        });

        //check all the assigneeList of task and add them to the projectTaskCountByUser



        projectInfo.projectSectionIdList.forEach((section) => {
            projectTaskCount['Total Sections'] += 1;
            projectTaskCountBySection[section.sectionName] = 0;
            section.taskIdList.forEach((task) => {
                projectTaskCount['Total Tasks'] += 1;
                projectTaskCountByPriority[task.taskPriority] += 1;
                projectTaskListByPriority[task.taskPriority]['total'] += 1;
                projectTaskListByPriority[task.taskPriority][task.taskCompletion ? 'completed' : 'not-completed'] += 1;
                projectTaskCountByStatus[task.taskStatus] += 1;
                projectTaskCountBySection[section.sectionName] += 1;
                task.taskAssigneeList.forEach((assignee) => {
                    projectTaskCountByUser[assignee.userName] += 1;
                });

                if (task.taskCompletion) {
                    projectCompletionCount['Completed'] += 1;
                } else {
                    projectCompletionCount['Not Completed'] += 1;
                }
            });
        });
    };

    { projectInfo && userInfo && fillTheData() }

    // console.log(projectTaskCountByPriority, 'projectTaskCountByPriority');
    // console.log(projectTaskCountByStatus, 'projectTaskCountByStatus');
    // console.log(projectCompletionCount, 'projectCompletionCount');
    // console.log(projectTaskCount, 'projectTaskCount');
    // console.log(projectTaskCountBySection, 'projectTaskCountBySection');
    // console.log(projectTaskCountByUser, 'projectTaskCountByUser');
    // console.log(projectTaskListByPriority, 'projectTaskListByPriority');



    return (
        <>
            <Container fluid={true} mt={'30px'} sx={classes.statsContainer} >
                <StatsChart basicData={projectTaskCount} />
            </Container>
            <Container fluid={true} mt={'30px'} sx={classes.container}>
                <ChartContainer
                    title='Task Priority'
                    basicData={projectTaskCountByPriority}
                />
                <ChartContainer
                    title='Task Status'
                    basicData={projectTaskCountByStatus}
                    bgColorPalette={[
                        'rgb(32, 201, 151)',
                        'rgb(252, 196, 25)',
                        'rgb(255, 107, 107)',
                    ]}
                />
                <ChartContainer
                    title='Task Completion Count'
                    basicData={projectCompletionCount}
                    bgColorPalette={[
                        'rgb(32, 201, 151)',
                        'rgb(255, 107, 107)',
                    ]}
                    chartType='pie'
                />
                <ChartContainer
                    title={'Task Count By Section'}
                    basicData={projectTaskCountBySection}
                    bgColorPalette={[
                        'rgb(65, 129, 217)'
                    ]}
                />
                <ChartContainer
                    title={'Priority Chart'}
                    dataArray={[projectTaskListByPriority['High'], projectTaskListByPriority['Medium'], projectTaskListByPriority['Low'], projectTaskListByPriority['Choose Priority']]}
                    chartType='combined'
                    bgColorPalette={[
                        'rgb(255, 107, 107)',
                        'rgb(252, 196, 25)',
                        'rgb(32, 201, 151)',
                        'rgb(32, 201, 151)',
                        'rgb(252, 196, 25)',
                        'rgb(255, 107, 107)',
                    ]}
                />
                <ChartContainer
                    title={'Task Count By User'}
                    basicData={projectTaskCountByUser}
                    bgColorPalette={[
                        'rgb(65, 129, 217)'
                    ]}
                />

                {/* {memberList && memberList.length > 0 && <UserInfoTable data={memberList} />} */}
                {/* {taskList && taskList.length > 0 && <TaskInfoTable data={taskList} />} */}


            </Container>
        </>
    );
}

export default LowAcessChartControl;