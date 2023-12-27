import React, { useEffect, useState } from "react";
import { Center, Container, createStyles, Flex, Group, Image, Loader, Paper, Select, Table, Text, Title } from "@mantine/core";
import RecentProjectContent from "./RecentProjectContent";
import FavoriteProjectContent from "./FavoriteProjectContent";
import { IconChevronDown } from "@tabler/icons-react";


const useStyles = createStyles((theme) => ({
  projectContainer: {
    display: "flex",
    flexDirection: "column",
    width: "40vw",
    height: "450px",
    backgroundColor: '#f1f3f5',
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadows.lg,
    // border: '1px solid',

    '&:hover': {
      // border: '1px solid white',
      // transform: 'scale(1.005)', 
    }

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
    paddingBottom: '0px'
  },



}));




const RecentProject = ({ user }) => {

  const { classes } = useStyles();
  const [projects, setProjects] = useState([]);
  const [value, setValue] = useState('Recent');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/getUserProjects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        // console.log(data.projects, "project data from recent project");
        setProjects(data.projects);
        setIsLoading(false);
      }
    };
    getProjects();
  }, []);

  const handleLinkClick = async (projects, project) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/project/updateLastUsed/${project._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          updatedLastUsed: new Date()
        })
      }
    );
    const data = await res.json();
  };

  return (
    <>
      <Paper sx={classes.projectContainer} withBorder>
        <Container fluid={true} m={0} p={0} mb={10} sx={classes.projectHeadContainer}>
          <Flex w={'100%'} pt={20} align={'center'} gap={10}>
            <Title order={2} color={"#05386b"} pl={10}>Projects</Title>
            <Select
              onChange={setValue}
              value={value}
              data={[{ value: "Recent", label: "Recent" }, { value: "Favorite", label: "Favorite" }]}
              size="small"
              rightSection={<IconChevronDown size="1rem" />}
              w={100}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              variant="filled"
              color={"#05386b"}
            />
          </Flex>
        </Container>

        {
          <Container fluid={true} m={0} p={0} sx={classes.projectContentContainer}>
            {!isLoading && value === "Recent" && projects.length > 0 && <RecentProjectContent userId={user._id} projectList={projects} />}
            {!isLoading && value === "Favorite" && user && <FavoriteProjectContent userId={user._id} favProjectList={user.favProjectIdList} />}
            {
              !isLoading && value == "Recent" && projects.length === 0 &&
              <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'} direction={'column'}>
                <Image maw={120} mx="auto" radius="md" src="https://www.linkpicture.com/q/project-management.png" alt="Random image" />
                <Text>No Projects</Text>
              </Flex>
            }
            {
              isLoading &&
              <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'} direction={'column'}>
                <Loader size="lg" />
              </Flex>
            }
          </Container>
        }
      </Paper>
    </>
  );
};

export default RecentProject;