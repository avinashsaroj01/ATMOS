import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createStyles, getStylesRef, Group, Paper, Text, Title } from "@mantine/core";
import { Icon3dCubeSphere, IconChartArcs3, IconChartBar, IconHexagonLetterA, IconHexagonLetterP, IconMenu2, IconPlus } from "@tabler/icons-react";


const colorCodes = [
  "#ff6b6b",
  "#f06595",
  "#cc5de8",
  "#845ef7",
  "#5c7cfa",
  "#4dabf7",
];

const useStyles = createStyles((theme) => ({
  projectContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    minHeight: "93vh",
    height: "100%",
    padding: theme.spacing.md,
  },
  projectBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "fit-content",
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    // border: "1px solid black",
    borderRadius: theme.radius.md,
    transition: "transform 150ms ease, box-shadow 150ms ease",
    boxShadow: theme.shadows.lg,
    borderRadius: theme.radius.lg,
    [`&:hover`]: {
      transform: "scale(1.03)",
    },
    marginBottom: 0,
  },

  plus: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    // backgroundColor: '#e7f5ff',
    // '&:hover': {
    //   transform: 'scale(1.01)',
    //   boxShadow: theme.shadows.md,
    // },
  },
  projectCard: {},

  iconPlus: {
    ref: getStylesRef("image"),
    height: "100%",
    width: "100%",
    // backgroundColor: colorCodes[],
  },
}));

const ProjectList = ({ projects, userInfo }) => {
  const { classes } = useStyles();
  const [user, setUser] = useState(userInfo);
  console.log(user, "user from project list");
  console.log(projects, "projects from project list");

  const handleLinkClick = async (project) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/project/updateLastUsed/${project._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          updatedLastUsed: new Date(),
        }),
      }
    );
    const data = await res.json();
  };

  const navigate = useNavigate();

  const insideProject = (project) => {
    handleLinkClick(project);
    navigate(`/projects/${project._id}/overview`);
  };

  return (
    <Paper p={20} sx={classes.projectContainer} bg={'#f8f9fa'}>
      <Group sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper sx={classes.projectBox} withBorder bg={colorCodes[colorCodes.length - 1]} onClick={() => { navigate('/createproject') }}>
          <Paper sx={classes.plus} h={110} w={130} bg={colorCodes[colorCodes.length - 1]} px={10}>
            <IconPlus className={classes.iconPlus} color='white' />
          </Paper>
        </Paper>
        <Title order={4}>Add Project</Title>
      </Group>

      {projects &&
        projects
          .map((project, index) => (
            <>
              <Group sx={{ display: 'flex', flexDirection: 'column' }}>
                <Paper sx={classes.projectBox} onClick={() => { insideProject(project) }} key={index} bg={colorCodes[index]} withBorder>
                  <Paper sx={classes.plus} h={110} w={130} bg={colorCodes[index]} px={10}>
                    {index === 0 && <IconHexagonLetterA color='white' className={classes.iconPlus} />}
                    {index === 1 && <IconChartBar color='white' className={classes.iconPlus} />}
                    {index === 2 && <IconChartArcs3 color='white' className={classes.iconPlus} />}
                    {index === 3 && <Icon3dCubeSphere color='white' className={classes.iconPlus} />}
                    {index === 4 && <IconMenu2 color='white' className={classes.iconPlus} />}
                  </Paper>
                </Paper>
                <Title order={4}>{project.projectName}</Title>
              </Group>
            </>

          ))
          .reverse()}
    </Paper>
  );
};

export default ProjectList;
