import React, { useState } from "react";
import { Container, createStyles, Flex, Group, Paper, Select, Table, Tabs, Title } from "@mantine/core";
import { IconHourglassFilled, IconHourglassHigh, IconHourglassOff } from "@tabler/icons-react";
import OverdueTaskContent from "./OverdueTaskContent";
import UpcomingTaskContent from "./UpcomingTaskContent";
import CompletedTaskList from "./CompletedTaskContent";

const useStyles = createStyles((theme) => ({
  projectContainer: {
    display: "flex",
    flexDirection: "column",
    width: "40vw",
    height: "450px",
    backgroundColor: '#f1f3f5',
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadows.lg,

  },
  projectContentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",

    // '&:hover': {
    //   border: '1px solid gray',
    // }

  },
  projectHeadContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "fit-height",
    padding: theme.spacing.md,
    paddingBottom: '0px',
    // borderBottom: '1px solid #dee2e6',
  },



}));

const Priority = ({ user }) => {
  // const [taskType, setTaskType] = useState(1);
  const { classes } = useStyles();
  const [currTab, setCurrTab] = useState("overdue");

  return (
    <>
      {/* {projects.length > 0 && ( */}
      <Paper sx={classes.projectContainer} withBorder>
        <Container fluid={true} m={0} p={0} mb={5} px={10} pt={10} sx={classes.projectHeadContainer}>
          <Flex justify={'space-between'} w={'100%'} p={0} m={0} pt={20}>
            <Title order={2} color={"#05386b"}>Task</Title>
            <Tabs defaultValue="overdue" value={currTab} onTabChange={setCurrTab} p={0} m={0}>
              <Tabs.List p={0} m={0}>
                <Tabs.Tab value="overdue" icon={<IconHourglassOff size="0.8rem" />}>Overdue</Tabs.Tab>
                <Tabs.Tab value="upcoming" icon={<IconHourglassHigh size="0.8rem" />}>Upcoming</Tabs.Tab>
                <Tabs.Tab value="completed" icon={<IconHourglassFilled size="0.8rem" />}>Completed</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Flex>
        </Container>
        <Container fluid={true} m={0} p={0} sx={classes.projectContentContainer} withBorder>
          {currTab === "overdue" && <OverdueTaskContent taskList={user.taskAssignedIdList} />}
          {currTab === "upcoming" && <UpcomingTaskContent taskList={user.taskAssignedIdList} />}
          {currTab === "completed" && <CompletedTaskList taskList={user.taskAssignedIdList} />}
        </Container>
      </Paper>
      {/* ) */}
      {/* } */}
    </>
  );
};

export default Priority;