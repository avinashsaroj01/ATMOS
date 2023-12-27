import { Container, createStyles } from "@mantine/core";
import ChartContainer from "./ChartContainer";
import StatsChart from "./StatsChart";

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


const HighAccessChartControl = ({ projectInfo, userInfo }) => {

    console.log(userInfo, 'userInfo from HighAccessChartControl');

    const { classes, } = useStyles();

    const projectTaskCountForUser = {
        'Assigned Tasks': 0,
        'Completed Tasks': 0,
    }

    const projectTaskCountByPriorityForUser = {
        'High': 0,
        'Medium': 0,
        'Low': 0,
        'Choose Priority': 0,
    };

    const projectTaskCountByStatusForUser = {
        'In Progress': 0,
        'Stuck': 0,
        'Backlog': 0,
        'Done': 0,
        'Choose Status': 0,
    };

    const projectTaskCountByPriorityAndStatusForUser = {
        'High': {
            'In Progress': 0,
            'Stuck': 0,
            'Backlog': 0,
            'Done': 0,
            'Choose Status': 0,
        },
        'Medium': {
            'In Progress': 0,
            'Stuck': 0,
            'Backlog': 0,
            'Done': 0,
            'Choose Status': 0,
        },
        'Low': {
            'In Progress': 0,
            'Stuck': 0,
            'Backlog': 0,
            'Done': 0,
            'Choose Status': 0,
        },
        'Choose Priority': {
            'In Progress': 0,
            'Stuck': 0,
            'Backlog': 0,
            'Done': 0,
            'Choose Status': 0,
        },
    };

    const projectTaskCountByStatusAndPriorityForUser = {
        'In Progress': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
        'Stuck': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
        'Backlog': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
        'Done': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
        'Choose Status': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
    };

    const projectTaskListByPriorityForUser = {
        'High': {
            'completed': 0,
            'incomplete': 0,
            'total': 0,
        },
        'Medium': {
            'completed': 0,
            'incomplete': 0,
            'total': 0,
        },
        'Low': {
            'completed': 0,
            'incomplete': 0,
            'total': 0,
        },
        'Choose Priority': {
            'completed': 0,
            'incomplete': 0,
            'total': 0,
        },
    };


    const fillTheData = () => {

        userInfo.taskAssignedIdList.forEach((task) => {
            if (task.taskProjectId === projectInfo._id) {
                projectTaskCountForUser['Assigned Tasks']++;
                if (task.taskStatus === 'Done') {
                    projectTaskCountForUser['Completed Tasks']++;
                }
                projectTaskCountByPriorityForUser[task.taskPriority]++;
                projectTaskCountByStatusForUser[task.taskStatus]++;
                projectTaskCountByPriorityAndStatusForUser[task.taskPriority][task.taskStatus]++;
                projectTaskCountByStatusAndPriorityForUser[task.taskStatus][task.taskPriority]++;
                projectTaskListByPriorityForUser[task.taskPriority]['total']++;
                if (task.taskStatus === 'Done') {
                    projectTaskListByPriorityForUser[task.taskPriority]['completed']++;
                } else {
                    projectTaskListByPriorityForUser[task.taskPriority]['incomplete']++;
                }
            }
        });

    }

    { projectInfo && userInfo && fillTheData() }

    console.log(projectTaskCountForUser, 'projectTaskCountForUser');
    console.log(projectTaskCountByPriorityForUser, 'projectTaskCountByPriorityForUser');
    console.log(projectTaskCountByStatusForUser, 'projectTaskCountByStatusForUser');
    console.log(projectTaskCountByPriorityAndStatusForUser, 'projectTaskCountByPriorityAndStatusForUser');
    console.log(projectTaskCountByStatusAndPriorityForUser, 'projectTaskCountByStatusAndPriorityForUser');
    console.log(projectTaskListByPriorityForUser, 'projectTaskListByPriorityForUser');













    return (
        <>
            <Container fluid={true} mt={'30px'} sx={classes.statsContainer} >
                <StatsChart basicData={projectTaskCountForUser} />
            </Container>
            <Container fluid={true} mt={'30px'} sx={classes.container}>
                <Container sx={classes.chartOuterContainer}>
                    <Container sx={classes.chartInnerContainer}>
                        <ChartContainer
                            title='Task Priority'
                            basicData={projectTaskCountByPriorityForUser}
                        />
                        <ChartContainer
                            title='Task Status'
                            basicData={projectTaskCountByStatusForUser}
                            bgColorPalette={[
                                'rgb(32, 201, 151)',
                                'rgb(252, 196, 25)',
                                'rgb(255, 107, 107)',
                            ]}
                        />
                        <ChartContainer
                            title={'Priority Chart'}
                            dataArray={[projectTaskListByPriorityForUser['High'], projectTaskListByPriorityForUser['Medium'], projectTaskListByPriorityForUser['Low'], projectTaskListByPriorityForUser['Choose Priority']]}
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
                            title={'Status Chart'}
                            dataArray={[projectTaskCountByStatusAndPriorityForUser['In Progress'], projectTaskCountByStatusAndPriorityForUser['Stuck'], projectTaskCountByStatusAndPriorityForUser['Backlog'], projectTaskCountByStatusAndPriorityForUser['Done'], projectTaskCountByStatusAndPriorityForUser['Choose Status']]}
                            chartType='StatusPriorityChart'
                            bgColorPalette={[
                                'rgb(32, 201, 151)',
                                'rgb(255, 107, 107)',
                                'rgb(252, 196, 25)',
                                'rgb(32, 201, 151)',
                                'rgb(32, 201, 151)',
                                'rgb(255, 107, 107)',
                                'rgb(252, 196, 25)',
                                'rgb(32, 201, 151)',
                            ]}
                        />


                    </Container>
                </Container>
            </Container>
        </>
    );
}

export default HighAccessChartControl;